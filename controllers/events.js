const path = require('path');
const auth = require('../auth.js');
const server = require('../server');

module.exports.all = async (req, res) => {
    if (await auth.check(req)) res.redirect('/auth/login');
    else res.sendFile(path.join(__dirname, '../views/events.html'));
}

module.exports.byId = async (req, res) => {
    if (await auth.check(req)) res.redirect('/auth/login');
    else res.sendFile(path.join(__dirname, '../views/events.html'));
}

module.exports.create = async (req, res) => {
    if (await auth.check(req)) res.redirect('/auth/login');
    else res.sendFile(path.join(__dirname, '../views/events.create.html'));
}

module.exports.join = async (req, res) => {
    if (await auth.check(req)) res.redirect('/auth/login');
    else res.sendFile(path.join(__dirname, '../views/events.html'));
}

module.exports.delete = async (req, res) => {
    if (await auth.check(req)) res.redirect('/auth/login');
    else res.sendFile(path.join(__dirname, '../views/events.html'));
}