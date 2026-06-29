import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { auth } from '@/server/auth'

// Issues client-upload tokens for Vercel Blob. Client uploads go directly to
// Blob (bypassing the 4.5 MB serverless body limit — important for video
// reels). Only approved accounts may obtain a token. The MediaAsset DB row is
// created by the client via the media.record tRPC mutation after upload.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth()
        if (!session?.user || session.user.approvalStatus !== 'APPROVED') {
          throw new Error('Unauthorized')
        }
        return {
          allowedContentTypes: ['image/*', 'video/*'],
          addRandomSuffix: true,
          maximumSizeInBytes: 200 * 1024 * 1024, // 200 MB
        }
      },
      onUploadCompleted: async () => {
        // No-op: Vercel cannot call back to localhost during development, so
        // the DB record is created client-side via media.record instead.
      },
    })
    return NextResponse.json(json)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
