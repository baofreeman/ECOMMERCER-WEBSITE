const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5555;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log(`DataBase connecting`);
  server.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
