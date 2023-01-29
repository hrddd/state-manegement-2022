import { zodiosNextApp } from '@zodios/express'
import { helloRouter } from './hello'

export const app = zodiosNextApp()
app.use('/api', helloRouter)
