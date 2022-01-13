const express = require("express");
// Path module has many useful properties and methods to access and manipulate paths in the file system.
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/user");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(helmet());
app.use(cors());

// app.use((req, res, next) => {
//   res.json({ message: "All good mate!" });
//   next();
// });

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Renvoie les requetes dans la console
app.use(morgan("tiny"));

app.use(limiter);

module.exports = app;
