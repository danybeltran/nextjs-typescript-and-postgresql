import { getUserPreferences } from '@/lib/server/preferences'

export async function GET() {
  const preferences = await getUserPreferences()

  return Response.json(preferences)
}
