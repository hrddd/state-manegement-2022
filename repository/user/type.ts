import { z } from 'zod'

export const user = z.object({
  name: z.string(),
  age: z.number(),
  icon: z.string().nullable(),
  type: z.union([z.literal('user'), z.literal('developer')]),
})

export type User = z.infer<typeof user>

export type UserLoginParam = Omit<User, 'icon'> & {
  icon?: File
}
