import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
  pgPool: Pool | undefined
}

// Initialize the Connection Pool (Reuse existing one if it exists)
const pool =
  globalForPrisma.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL
  })

// Initialize the Adapter
const adapter = new PrismaPg(pool)

// Initialize Prisma Client with the Adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

// Prevent connection leaks during Next.js HMR
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.pgPool = pool
}
