'use server'

import { getUserPreferences } from '@/lib/server/preferences'
import { prisma } from '@/lib/server/prisma'
import { UpdatePreferencesPayload } from '@/schemas'
import { actionData } from 'atomic-utils'

export async function updateUserPreferences(payload: UpdatePreferencesPayload) {
  const preferences = await getUserPreferences()

  const updatedPreferences = await prisma.preferences.update({
    where: {
      id: preferences.id
    },
    data: {
      user_fullname: payload.user_fullname.trim() || preferences.user_fullname,
      user_description:
        payload.user_description.trim() || preferences.user_description
    }
  })

  return actionData(updatedPreferences)
}
