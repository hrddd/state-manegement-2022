import { makeApi, makeErrors } from '@zodios/core'
import { z } from 'zod'

export const hello = z.object({
  message: z.string(),
})

export type Hello = z.infer<typeof hello>

export const helloErrors = makeErrors([
  {
    status: 404,
    description: 'Hello not found',
    schema: z.object({
      error: z.object({
        code: z.string(),
        message: z.string(),
      }),
    }),
  },
  {
    status: 'default',
    description: 'Default error',
    schema: z.object({
      error: z.object({
        code: z.string(),
        message: z.string(),
      }),
    }),
  },
])

export const helloApi = makeApi([
  {
    method: 'get',
    path: '/hello',
    alias: 'hello',
    description: 'hello!',
    response: hello,
    errors: helloErrors,
  },
])
