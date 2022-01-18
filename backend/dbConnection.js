const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: "new_user",
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connection created with Mysql 1 successfully");
  }
});

module.exports = connection;
