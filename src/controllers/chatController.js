const replaceEmotes = require('../utils/emotes');

module.exports = (socket, io) => {
    socket.on('chat message', (msg) => {
        // Acesse a sessão do usuário
        const user = socket.handshake.session.user;
        if (user) {
            const messageWithEmotes = replaceEmotes(msg);
            io.emit('chat message', { username: user.username, message: messageWithEmotes });
        }
    });

    socket.on('disconnect', () => {
        console.log('Um usuário desconectou');
    });
};