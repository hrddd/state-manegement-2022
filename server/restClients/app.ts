import { Zodios } from '@zodios/core'
import { z } from 'zod'
import { server } from '../../__mock__/rest/startRestMockServer'
import { postIt } from '../../repository/postIts/type'

console.log(process.env.REST_URL)

// if (process.env.NODE_ENV === 'development') {
//   if (typeof window === 'undefined') {
//     server.listen()
//   } else {
//     worker.start()
//   }
// }
if (typeof window === 'undefined') {
  server.listen()
}

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
