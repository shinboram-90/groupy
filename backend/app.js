const express = require("express");
// Path module has many useful properties and methods to access and manipulate paths in the file system.
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connection created with Mysql successfully");
  }
});

const app = express();

app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "All good mate!" });
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// Renvoie les requetes dans la console
app.use(morgan("tiny"));

app.use(limiter);

module.exports = app;
