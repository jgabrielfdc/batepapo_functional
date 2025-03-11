const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat');
    } else {
        res.sendFile(path.join(__dirname, '../../views/login.html')); // Caminho corrigido
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;