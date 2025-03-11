const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

// Mostrar/ocultar o seletor de emojis
emojiBtn.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
});

// Inserir emoji no campo de input
emojiPicker.addEventListener('click', (event) => {
    if (event.target.classList.contains('emoji')) {
        input.value += event.target.textContent; // Adiciona o emoji ao input
        input.focus(); // Mantém o foco no campo de input
    }
});

// Enviar mensagem
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Receber mensagem
socket.on('chat message', (data) => {
    const item = document.createElement('li');
    item.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Rolagem automática
});