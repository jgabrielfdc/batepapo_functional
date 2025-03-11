const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({ username, password: hashedPassword });
        res.redirect('/');
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user; // Configura a sessão
            res.redirect('/chat');
        } else {
            res.send('Login falhou');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};