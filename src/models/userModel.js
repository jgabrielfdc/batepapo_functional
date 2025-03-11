const users = [];

module.exports = {
    create: (user) => users.push(user),
    findByUsername: (username) => users.find(u => u.username === username)
};