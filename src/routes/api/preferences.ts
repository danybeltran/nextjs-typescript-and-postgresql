import { createFileRoute } from '@tanstack/react-router'
import { getUserPreferences } from '@/lib/server/preferences'

export const Route = createFileRoute('/api/preferences')({
  server: {
    handlers: {
      GET: async () => {
        const preferences = await getUserPreferences()
        return Response.json(preferences ?? {})
      }
    }
  }
})
