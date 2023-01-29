/**
 * This file contains the root router of your tRPC-backend
 */
import { postItHandler } from './handlers/postIt'
import { router } from './trpc'

export const appRouter = router({
  postIt: postItHandler,
})

export type AppRouter = typeof appRouter
