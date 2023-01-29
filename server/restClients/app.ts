import { Zodios } from '@zodios/core'
import { z } from 'zod'
import { postIt } from '../../repository/postIts/type'

console.log(process.env.REST_URL)
export const restClient = new Zodios(`${process.env.REST_URL}`, [
  {
    method: 'get',
    path: '/postit',
    alias: 'getPostIt',
    response: z.object({
      data: z.array(postIt),
    }),
  },
])
