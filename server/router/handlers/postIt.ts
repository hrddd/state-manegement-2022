import { publicProcedure } from '../trpc'

export const postItHandler = publicProcedure.query(async () => {
  // const data = await fetch(`${process.env.REST_URL}/postit`)
  // return data.json()
  return {
    data: [],
  }
})
