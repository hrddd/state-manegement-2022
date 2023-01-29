import { z } from 'zod'
import { postIt } from '../../repository/postIts/type'

export const postItsClient = {
  method: 'get',
  path: '/postit',
  alias: 'getPostIt',
  response: z.object({
    data: z.array(postIt),
  }),
}
