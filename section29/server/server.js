const express = require('express')
const app = express()
const server = require('http')
const socketIO = require('socket.io')

const http = server.createServer(app)
const io = socketIO(http)

app.use(express.static(__dirname + '/../public'))

io.on('connection', socket => {
  console.log('someone is connected')

  socket.on('disconnect', socket => {
    console.log('disconnected from the server')
  })
})

http.listen(3000, console.log('Connected'))