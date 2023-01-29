import { setupWorker } from 'msw'
import { setupServer } from 'msw/node'
import { chatHandlers } from './hendlers/postIt'

const handlers = [...chatHandlers]

export const worker = setupWorker(...handlers)

export const server = setupServer(...handlers)
