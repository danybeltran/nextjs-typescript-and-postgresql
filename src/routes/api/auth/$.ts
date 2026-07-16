import { createFileRoute } from '@tanstack/react-router'
import { Auth } from '@auth/core'
import { authConfig } from '@/lib/server/auth'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.log('AUTH GET REQUEST URL:', request.url)
        const response = await Auth(request, authConfig)
        console.log('AUTH GET RESPONSE STATUS:', response.status)
        return response
      },
      POST: async ({ request }) => {
        console.log('AUTH POST REQUEST URL:', request.url)
        const response = await Auth(request, authConfig)
        console.log('AUTH POST RESPONSE STATUS:', response.status)
        return response
      }
    }
  }
})
