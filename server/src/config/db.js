const mongoose = require("mongoose");

require("dotenv").config({
  path: __dirname + "/config.env",
});

console.log(process.env.MONGO_URL);

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected 🔌: ${connection.connection.host}`);
};

module.exports = connectDB;
