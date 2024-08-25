const mongoose = require("mongoose");

// Connect Mongodb.
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
