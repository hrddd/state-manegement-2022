import { z } from 'zod'
import { postIt } from '../../../repository/postIts/type'
import { restClient } from '../../restClients/app'
import { publicProcedure } from '../trpc'

export const postItHandler = publicProcedure
  .output(
    z.object({
      data: z.array(postIt),
    }),
  )
  .query(async () => {
    console.log(restClient)
    console.log(restClient.getPostIt)
    const data = await restClient.getPostIt()
    console.log(data)
    return data
    // return {
    //   data: [],
    // }
  })
