import { defineConfig } from '@prisma/config'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL
  }
})
