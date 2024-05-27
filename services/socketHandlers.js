const socketHandlers = (io) => {
    console.log('sockethandlers runs')
    console.log(io, '  io in sockethandlers')

    io.on('connection', (socket) => {
        console.log('a user connected')

        // events
        socket.on('join', async (data) => {
            console.log("Join event received")
        });



        // chat events
        socket.on('takeTurn', async (data) => {
            console.log("Turn event received")
        });


        socket.on('quit', () => {
            console.log('user quat')
        });
    });
};

export default socketHandlers