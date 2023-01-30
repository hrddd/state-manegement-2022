import { ZodiosPathsByMethod, ZodiosResponseByPath } from '@zodios/core'
import { rest } from 'msw'
import { MyApi } from '../../../server/restClients/app'

const _user1 = {
  name: 'sample1',
  age: 10,
  icon: null,
  type: 'user' as const,
}

const zodiosMswHandlerFactory = <
  Method extends 'get' | 'post',
  Path extends ZodiosPathsByMethod<MyApi, Method>,
  O extends ZodiosResponseByPath<MyApi, Method, Path>,
>(endpoint: {
  path: Path
  response: O
  method?: Method
}) => {
  const fn = endpoint.method === 'post' ? rest.post : rest.get
  const route = `${process.env.REST_URL || ''}${endpoint.path}`
  return fn(route, (req, res, ctx) => {
    return res(ctx.json(endpoint.response))
  })
}

const getChatHandler = zodiosMswHandlerFactory({
  method: 'get',
  path: '/postit',
  response: {
    // room,
    data: [
      {
        id: 0,
        text: 'test',
        themeId: 0,
        position: {
          x: 0,
          y: 0,
          z: 1,
        },
        size: {
          width: 200,
          height: 200,
        },
        user: _user1,
        lastUpdate: '2023-01-01T12:00',
      },
      {
        id: 1,
        text: 'test2',
        themeId: 1,
        position: {
          x: 100,
          y: 100,
          z: 0,
        },
        size: {
          width: 200,
          height: 200,
        },
        user: _user1,
        lastUpdate: '2023-01-01T12:00',
      },
    ],
  },
})

// const getChatHandler = rest.get(`${process.env.REST_URL}/postit`, async (req, res, ctx) => {
//   // const { room } = await req.json()
//   return res(
//     ctx.json({
//       // room,
//       data: [
//         {
//           id: 0,
//           text: 'test',
//           themeId: 0,
//           position: {
//             x: 0,
//             y: 0,
//             z: 1,
//           },
//           size: {
//             width: 200,
//             height: 200,
//           },
//           user: _user1,
//           lastUpdate: '2023-01-01T12:00',
//         },
//         {
//           id: 1,
//           text: 'test2',
//           themeId: 1,
//           position: {
//             x: 100,
//             y: 100,
//             z: 0,
//           },
//           size: {
//             width: 200,
//             height: 200,
//           },
//           user: _user1,
//           lastUpdate: '2023-01-01T12:00',
//         },
//       ],
//     }),
//   )
// })

export const chatHandlers = [getChatHandler]
