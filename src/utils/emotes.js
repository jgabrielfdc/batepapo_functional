const emotes = {
    ':)': '😊',
    ':(': '😢',
    ':D': '😃',
    '<3': '❤️'
};

// Função para escapar caracteres especiais em regex
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapa caracteres especiais
};

module.exports = (text) => {
    for (const [key, value] of Object.entries(emotes)) {
        const escapedKey = escapeRegExp(key); // Escapa a chave
        text = text.replace(new RegExp(escapedKey, 'g'), value);
    }
    return text;
};