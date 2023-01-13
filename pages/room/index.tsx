import { Inter } from '@next/font/google'
import { createWSClient, createTRPCProxyClient, wsLink } from '@trpc/client'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { z } from 'zod'
import Room from '../../components/templates/Room'
import { AppRouter } from '../../server/ws/routers/_app'
const inter = Inter({ subsets: ['latin'] })

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

// create persistent WebSocket connection
const wsClient = createWSClient({
  url: `ws://localhost:3001`,
})
// configure TRPCClient to use WebSockets transport
const client = createTRPCProxyClient<AppRouter>({
  links: [
    wsLink({
      client: wsClient,
    }),
  ],
})

export default function RoomPage({ roomId }: Props) {
  return (
    <>
      <Head>
        <title>Room</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Room roomId={roomId} />
    </>
  )
}

const propsScheme = z.object({
  roomId: z
    .string()
    .refine((v) => {
      return !isNaN(parseInt(v, 10))
    }, 'roomId must be number')
    .transform((themeId) => {
      return parseInt(themeId, 10)
    }),
})

type PropSchemeOutput = z.infer<typeof propsScheme>

export const getServerSideProps: GetServerSideProps<PropSchemeOutput> = async ({ query }) => {
  const props = propsScheme.parse({
    roomId: query.roomId,
  })

  return {
    props,
  }
}
