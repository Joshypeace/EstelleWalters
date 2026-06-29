import type { PrismaClient } from '@/generated/prisma/client'

/** Resolve a venture slug to its id (null when blank or not found). */
export async function ventureIdFromSlug(db: PrismaClient, slug: string) {
  if (!slug) return null
  const v = await db.venture.findUnique({ where: { slug }, select: { id: true } })
  return v?.id ?? null
}
