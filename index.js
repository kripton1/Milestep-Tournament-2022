const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5000;

// initialisation middleware components
app.use(compression());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("cors")());
morgan("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "logs/error.log"), {
    flags: "a",
  }),
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "logs/access.log"), {
      flags: "a",
    }),
  })
);

// routes
app.use("/auth", require("./routes/auth"));

// including IO response
require('./server')(io);

// starting listening server
server.listen(port, () => {
  console.log("--- Server has been started. Link: http://localhost:" + port);
});
