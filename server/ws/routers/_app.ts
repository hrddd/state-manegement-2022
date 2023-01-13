/**
 * This file contains the root router of your tRPC-backend
 */
import { clearInterval } from 'timers'
import { observable } from '@trpc/server/observable'
import { router, publicProcedure } from '../trpc'

export const appRouter = router({
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random())
      }, 500)
      return () => {
        clearInterval(int)
      }
    })
  }),
})

export type AppRouter = typeof appRouter
