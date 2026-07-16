import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, "Title can't be empty"),
  content: z.string().min(1, "Description can't be empty")
})

export const preferencesSchema = z.object({
  user_fullname: z.string().min(1, "Name cannot be empty").trim(),
  username: z.string().min(3, "Username must be at least 3 characters").trim().toLowerCase(),
  user_description: z.string().trim().nullable().optional()
})

export type UpdatePreferencesPayload = z.infer<typeof preferencesSchema>
