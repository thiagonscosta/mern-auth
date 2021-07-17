const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

require("dotenv").config({
  path: __dirname + "/config/config.env",
});

const app = express();
app.use(express.json());

// console.log(process.env.MONGO_URL);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

const authRouter = require("./routes/authRoutes");

app.use("/api", authRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server ⚡ on port ${PORT}`);
});
