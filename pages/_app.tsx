import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { server } from '../__mock__/rest/startRestMockServer'
import { worker } from '../__mock__/rest/startRestMockWorker'
import { store } from '../repository/store'
import { trpc } from '../utils/trpc'

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

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default trpc.withTRPC(App)
