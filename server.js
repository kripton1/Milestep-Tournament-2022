const db = require('./db');
const crypto = require('./crypto');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });


    socket.on("user.login", (obj) => {

        if ( !obj.email || obj.email.trim()+'' === '' ) { io.emit('user.login.error', 'Email should be filled'); return; }
        if ( !obj.password || obj.password.trim()+'' === '' ) { io.emit('user.login.error', 'Password should be filled'); return; }

        db.get('SELECT * FROM ev_users WHERE email = ? AND password = ?', obj.email, crypto.encrypt(obj.password), (err, row) => {
          if ( err ) throw err;
          if ( !row ) io.emit('user.login.error', 'Invalid email or password');
          else io.emit('user.login.success', row);
        });
    });

    


  });
};
