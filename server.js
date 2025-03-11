const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const session = require('express-session');
const sharedSession = require('express-socket.io-session'); // Importe a biblioteca

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração de sessão
const sessionMiddleware = session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
});

// Compartilhe a sessão com o Socket.IO
io.use(sharedSession(sessionMiddleware, {
    autoSave: true
}));

// Use a sessão no Express
app.use(sessionMiddleware);

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/', require('./src/routes/authRoutes'));
app.use('/chat', require('./src/routes/chatRoutes'));

// Socket.IO
io.on('connection', (socket) => {
    console.log('Um usuário conectou');
    require('./src/controllers/chatController')(socket, io);
});

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});