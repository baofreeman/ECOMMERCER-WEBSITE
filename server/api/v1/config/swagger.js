const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

let swaggerDocument;
try {
  swaggerDocument = yaml.load(
    fs.readFileSync(path.join(__dirname, "..", "..", "swagger.yaml"), "utf8")
  );
  console.log("Swagger Document loaded successfully.");
} catch (error) {
  console.error("Error loading swagger.yaml:", error);
  swaggerDocument = {}; // Provide a default empty object in case of error
}

module.exports = { swaggerDocument };
