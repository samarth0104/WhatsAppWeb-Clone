import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let users = [];
const addUser = (userData, socketId) => {
    const userExists = users.find(user => user.sub === userData.sub);
    if (userExists) {
        // Update the socketId if the user already exists
        userExists.socketId = socketId;
    } else {
        users.push({ ...userData, socketId });
    }
}


const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.error(`User with id ${data.receiverId} not found.`);
        }
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
        console.log('user disconnected');
    });
});

