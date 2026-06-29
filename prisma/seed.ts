import bcrypt from 'bcryptjs'
import { db } from '../src/server/db'

// Seed the bootstrap owner: a single pre-approved ADMIN read from env vars.
// Re-running is idempotent (upsert by email). Content seeding is added later.
async function seedOwner() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.toLowerCase()
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD
  const name = process.env.BOOTSTRAP_ADMIN_NAME ?? 'Owner'

  if (!email || !password) {
    console.warn(
      '⚠ BOOTSTRAP_ADMIN_EMAIL / BOOTSTRAP_ADMIN_PASSWORD not set — skipping owner seed.'
    )
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const owner = await db.user.upsert({
    where: { email },
    update: { role: 'ADMIN', approvalStatus: 'APPROVED', name },
    create: { email, name, passwordHash, role: 'ADMIN', approvalStatus: 'APPROVED' },
  })
  console.log(`✓ Owner ready: ${owner.email} (ADMIN, APPROVED)`)
}

async function main() {
  await seedOwner()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
