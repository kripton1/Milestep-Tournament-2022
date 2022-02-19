const db = require("./db");
const crypto = require("./crypto");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("user.login", (obj) => {
      if (!obj.email || obj.email.trim() + "" === "") {
        io.emit("user.login.error", "Email should be filled");
        return;
      }
      if (!obj.password || obj.password.trim() + "" === "") {
        io.emit("user.login.error", "Password should be filled");
        return;
      }

      db.get(
        "SELECT * FROM ev_users WHERE email = ? AND password = ?",
        obj.email,
        crypto.encrypt(obj.password),
        (err, row) => {
          if (err) throw err;
          if (!row) io.emit("user.login.error", "Invalid email or password");
          else {
            delete row.password;
            delete row.date_reg;
            delete row.date_lastlogin;

            io.emit("user.login.success", crypto.encrypt(JSON.stringify(row)));
          }
        }
      );
    });

    socket.on("user.registration", (obj) => {
      if (!obj.name || obj.name.trim() + "" === "") {
        io.emit("user.registration.error", "Name should be filled");
        return;
      }
      if (!obj.surname || obj.surname.trim() + "" === "") {
        io.emit("user.registration.error", "Surname should be filled");
        return;
      }
      if (!obj.email || obj.email.trim() + "" === "") {
        io.emit("user.registration.error", "Email should be filled");
        return;
      }
      if (!obj.password || obj.password.trim() + "" === "") {
        io.emit("user.registration.error", "Password should be filled");
        return;
      }

      db.get(
        "SELECT id FROM ev_users WHERE email = ?",
        obj.email,
        (err, row) => {
          if (err) throw err;
          if (row)
            io.emit(
              "user.registration.error",
              "User with this email already exists"
            );
          else {
            db.run(
              "INSERT INTO ev_users (name, surname, email, password, date_reg, date_lastlogin) VALUES (?, ?, ?, ?, ?, ?)",
              obj.name,
              obj.surname,
              obj.email,
              crypto.encrypt(obj.password),
              new Date().getTime(),
              new Date().getTime(),
              (err) => {
                if (err) throw err;
                else {
                  db.get(
                    "SELECT id FROM ev_users WHERE email = ? and password = ?",
                    obj.email,
                    crypto.encrypt(obj.password),
                    (err, row) => {
                      if (err) throw err;
                      if (row) {
                        delete row.password;
                        delete row.date_reg;
                        delete row.date_lastlogin;

                        io.emit(
                          "user.registration.success",
                          crypto.encrypt(JSON.stringify(row))
                        );
                      } else console.error("--- Regstration user error");
                    }
                  );
                }
              }
            );
          }
        }
      );
    });



    socket.on('events.get.list', ()=>{
      db.all('SELECT * FROM ev_events', (err, rows)=>{
        socket.emit('events.list', rows);
      });
    });

    socket.on('events.create', (obj)=>{
      if (!obj.title || obj.title.trim() + "" === "") {
        io.emit("events.create.error", "Title should be filled");
        return;
      }
      if (!obj.description || obj.description.trim() + "" === "") {
        io.emit("events.create.error", "Description should be filled");
        return;
      }
      if (!obj.datetime || !parseInt(obj.datetime) ) {
        io.emit("events.create.error", "Date-time should be filled");
        return;
      }

      db.run('INSERT INTO ev_events (title, description, admin, date) VALUES (?, ?, ?, ?)',
      obj.title,
      obj.description,
      JSON.parse(crypto.decrypt(obj.token)).id,
      obj.datetime,
      (err)=>{
        if (err) throw err;
        else io.emit("events.create.success");
      });


    });

  });
};
