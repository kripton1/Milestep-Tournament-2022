const path = require('path');

module.exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}

module.exports.registration = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}