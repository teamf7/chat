var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/bundle.js", function(req, res) {
  res.sendFile(__dirname + "/public/bundle.js");
});

app.get("/bundle.css", function(req, res) {
  res.sendFile(__dirname + "/public/bundle.css");
});

let numUsers = 0;

io.on("connection", function(socket) {
  let addedUser = false;

  socket.on("add user", username => {
    console.log(username);
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers
    });

    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on("chat message", msg => {
    console.log(msg);
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: msg
    });
  });

  socket.on("disconnect", () => {
    if (addedUser) --numUsers;

    socket.broadcast.emit("user left", {
      username: socket.username,
      numUsers: numUsers
    });
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});