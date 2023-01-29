import { zodiosRouter } from '@zodios/express'
import { Hello, helloApi } from '../../common/api/hello'

export const helloRouter = zodiosRouter(helloApi)

helloRouter.get('/hello', async (req, res) => {
  res.status(200).json({
    message: 'zodios hello!',
  } as Hello)
})
