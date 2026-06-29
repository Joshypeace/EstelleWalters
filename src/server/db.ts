import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'
// Relative import (not the `@/` alias) so this module also resolves under tsx
// when running standalone scripts (seed, media migration).
import { PrismaClient } from '../generated/prisma/client'

// The Neon serverless driver needs a WebSocket implementation in Node.
neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL

const adapter = new PrismaNeon({ connectionString })

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
