import { prisma } from '@/lib/server/prisma'
import { postSchema } from '@/schemas'
import z from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { actionData } from 'atomic-utils'

const createPostFn = createServerFn({ method: 'POST' })
  .validator((post: z.infer<typeof postSchema>) => post)
  .handler(async ({ data: post }) => {
    try {
      const validation = postSchema.safeParse(post)

      if (validation.success) {
        const newPost = await prisma.post.create({
          data: post
        })

        return actionData(newPost)
      }

      return actionData(validation.error.format(), {
        status: 400
      })
    } catch {
      return {
        status: 500
      }
    }
  })

export async function createPost(post: z.infer<typeof postSchema>) {
  return createPostFn({ data: post })
}

const deletePostFn = createServerFn({ method: 'POST' })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: id
        }
      })

      return actionData(deletedPost, {
        status: 200
      })
    } catch {
      return {
        status: 500
      }
    }
  })

export async function deletePost(id: number) {
  return deletePostFn({ data: id })
}
