import { Server } from 'mock-socket'

const fakeURL = 'ws://localhost:8080'
const mockServer = new Server(fakeURL)

mockServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.send('test message from mock server')
  })
})
