'use server'

import { getUserPreferences } from '@/lib/server/preferences'
import { prisma } from '@/lib/server/prisma'
import { UpdatePreferencesPayload } from '@/schemas' // Assuming this is your Zod or similar schema
import { actionData } from 'atomic-utils' // Assuming this is your utility function

export async function updateUserPreferences(payload: UpdatePreferencesPayload) {
  const preferences = await getUserPreferences()

  if (!payload.username || payload.username.trim() === '') {
    return actionData('', {
      error: "Username can't be empty",
      status: 403
    })
  }

  const userNameTaken = await prisma.preferences.count({
    where: {
      AND: [
        {
          username: {
            equals: payload.username,
            mode: 'insensitive'
          },
          id: {
            not: { equals: preferences.id }
          }
        }
      ]
    }
  })

  if (userNameTaken > 0) {
    return actionData('', {
      error: 'Username already taken',
      status: 409
    })
  }

  const updatedPreferences = await prisma.preferences.update({
    where: {
      id: preferences.id
    },
    data: {
      user_fullname: payload.user_fullname.trim() || preferences.user_fullname,
      user_description:
        payload.user_description?.trim() ?? preferences.user_description ?? '',
      username: payload.username.toLowerCase()
    }
  })

  return actionData(updatedPreferences)
}
