import http from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import 'reflect-metadata'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import next from 'next'

// import { UserResolver } from '../experiment/resolvers'

const port = process.env.PORT || 6666
const isDev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev: isDev })
const nextRequestHandler = nextApp.getRequestHandler()

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

const app = express()
const httpServer = http.createServer(app)

async function bootstrap() {
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()

  app.use(compression(), cors(), bodyParser.json(), expressMiddleware(server))

  app.get('*', (req, res) => {
    return nextRequestHandler(req, res)
  })

  app.listen(port, () => {
    console.log(`> ${isDev ? 'Dev' : 'Prod'} ready @ Port ${port}`)
  })
}
nextApp.prepare().then(bootstrap)
