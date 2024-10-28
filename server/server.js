
import cors from "cors"
import { createServer } from 'http'
import { Server } from 'socket.io'
import socketHandlers from './services/socketHandlers.js'
import express from "express"
import Lobby from "./model/Lobby.js"
import controller from "./controllers/controller.js"

import 'dotenv/config';

const port = 8000

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

// create the game lobby
const lobby = new Lobby;
const myController = controller(lobby)


// Use the socketHandlers function to handle the Socket.IO events
socketHandlers(io, myController);

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})

export default io;