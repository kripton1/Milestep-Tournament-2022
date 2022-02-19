const path = require('path');

module.exports.all = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}

module.exports.create = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}

module.exports.join = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}

module.exports.delete = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth.html'));
}