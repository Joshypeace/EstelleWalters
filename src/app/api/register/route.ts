import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/server/db'
import { registerSchema } from '@/lib/validators'

// Open registration. New accounts are created PENDING with the EDITOR role and
// cannot reach the dashboard until an ADMIN approves them.
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    )
  }

  const { name, email, password } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: 'An account with that email already exists' },
      { status: 409 }
    )
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.user.create({
    data: { name, email, passwordHash, role: 'EDITOR', approvalStatus: 'PENDING' },
  })

  return NextResponse.json(
    { ok: true, message: 'Account created. An administrator will review it shortly.' },
    { status: 201 }
  )
}
