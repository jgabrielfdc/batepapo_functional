const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '../../views/chat.html')); // Caminho corrigido
    } else {
        res.redirect('/');
    }
});

module.exports = router;