import { ApiOf, Zodios, ZodiosBodyByPath, ZodiosPathsByMethod } from '@zodios/core'
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

export const restClient = new Zodios(`${process.env.REST_URL || ''}`, [
  {
    method: 'get',
    path: '/postit',
    alias: 'getPostIt',
    response: z.object({
      data: z.array(postIt),
    }),
  },
  {
    method: 'get',
    path: '/dummy',
    alias: 'getDummy',
    response: z.object({
      data: z.array(z.string()),
    }),
  },
  {
    method: 'post',
    path: '/dummy',
    alias: 'postDummy',
    status: 200,
    parameters: [
      // MEMO: どう足掻いてもエラー
      // MEMO: 環境、、？
      // {
      //   name: 'body',
      //   type: 'Body',
      //   description: 'aaa',
      //   scheme: z.object({
      //     id: z.string(),
      //   }),
      // },
    ],
    response: z.object({
      data: z.array(z.string()),
    }),
  },
])

export type MyApi = ApiOf<typeof restClient>
type PostIt = ZodiosBodyByPath<MyApi, 'post', '/dummy'>
type Paths = ZodiosPathsByMethod<MyApi, 'get'>
type Paths2 = ZodiosPathsByMethod<MyApi, 'post'>
type a = MyApi[0]
