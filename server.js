
import cors from "cors"
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketHandlers from './services/socketHandlers.js'
import express from "express"

const port = 8001

const app = express()

app.use(express.json())
app.use(cors())

// Create HTTP server 
const server = createServer(app);

// Create Socket.IO server using HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Use the socketHandlers function to handle the Socket.IO events
socketHandlers(io);

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})

export default io;