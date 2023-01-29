import { setupServer } from 'msw/node'
import { handlers } from '.'

export const server = setupServer(...handlers)

console.log(server)
