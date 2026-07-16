import { getUserPreferences } from '@/lib/server/preferences'
import { prisma } from '@/lib/server/prisma'
import { preferencesSchema, UpdatePreferencesPayload } from '@/schemas'
import { createServerFn } from '@tanstack/react-start'
import { actionData } from 'atomic-utils'

const updateUserPreferencesFn = createServerFn({ method: 'POST' })
  .validator((payload: UpdatePreferencesPayload) => payload)
  .handler(async ({ data: payload }) => {
    const validation = preferencesSchema.safeParse(payload)

    if (!validation.success) {
      return actionData('', {
        error: validation.error.issues[0]?.message || 'Invalid preferences data',
        status: 400
      })
    }

    const validatedData = validation.data
    const preferences = await getUserPreferences()

    const userNameTaken = await prisma.preferences.count({
      where: {
        AND: [
          {
            username: {
              equals: validatedData.username,
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
        user_fullname: validatedData.user_fullname || preferences.user_fullname,
        user_description: validatedData.user_description || '',
        username: validatedData.username
      }
    })

    return actionData(updatedPreferences)
  })

export async function updateUserPreferences(payload: UpdatePreferencesPayload) {
  return updateUserPreferencesFn({ data: payload })
}
