const path = require('path');
const auth = require('../auth.js');

module.exports.login = async (req, res) => {
    if (await auth.check(req, 'auth')) res.redirect('/events/all');
    else res.sendFile(path.join(__dirname, '../views/login.html'));
}

module.exports.registration = async (req, res) => {
    if (await auth.check(req, 'auth')) res.redirect('/events/all');
    else res.sendFile(path.join(__dirname, '../views/registration.html'));
}