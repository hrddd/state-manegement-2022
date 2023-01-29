import { z } from 'zod'
import { user } from '../user/type'

export const postIt = z.object({
  id: z.number(),
  text: z.string(),
  themeId: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  size: z.object({
    width: z.number(),
    height: z.number(),
  }),
  user,
  lastUpdate: z.string(),
})

export type PostIt = z.infer<typeof postIt>

// export type PostIt = {
//   id: number
//   text: string
//   themeId: typeof THEME_IDS[number]
//   position: {
//     x: number
//     y: number
//     z: number
//   }
//   size: {
//     width: number
//     height: number
//   }
//   user: User
//   lastUpdate: string
// }

export type PostItUpdateParam = Omit<PostIt, 'lastUpdate'>
