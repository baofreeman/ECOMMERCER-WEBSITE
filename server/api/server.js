const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5555;
const NODE_ENV = process.env.NODE_ENV;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log(`DataBase connecting`);
  server.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Server running ${PORT}`);
=======
    console.log(`Server is running ${PORT}, NODE_ENV:${NODE_ENV}`);
>>>>>>> a43ac0e (nodeenv)
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
