// Prisma 7 configuration. Connection URLs no longer live in schema.prisma.
// Secrets are in `.env.local` (Next.js convention), which Prisma does not load
// automatically — so we load it explicitly here.
import { config as loadEnv } from 'dotenv'
import { defineConfig } from 'prisma/config'

loadEnv({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Direct (unpooled) connection for the migration/schema engine — avoids
    // PgBouncer limitations during DDL. App runtime uses the pooled URL.
    url: process.env.DATABASE_URL_UNPOOLED,
  },
})
