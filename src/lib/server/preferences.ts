import { getServerSession } from 'next-auth'
import { prisma } from './prisma'

function generateUsernameWithRandomString(baseUsername: string): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < 6; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    )
  }
  return `${baseUsername}_${randomString}`
}

export async function getUserPreferences() {
  const session = (await getServerSession())!

  if (!session?.user) return null!

  const currentPreferences = await prisma.preferences.findFirst({
    where: {
      user_email: session.user!.email!
    }
  })

  if (!currentPreferences) {
    const initialUsername = generateUsernameWithRandomString(
      session.user!.email!.split('@').at(0)?.toLowerCase()!
    )

    return await prisma.preferences.create({
      data: {
        user_email: session.user!.email!,
        user_description: '',
        user_fullname: session.user?.name ?? initialUsername,
        user_profile_picture: session.user?.image!,
        username: initialUsername
      }
    })
  }

  return currentPreferences
}
