const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  // unix_socket: '/Applications/MAMP/Library/bin/mysql',
  // /Applications/MAMP/Library/bin/mysqld --skip-grant-tables
  // /Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot
  port: 8889,
  password: 'root',
  database: 'groupomania',
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connection created with Mysql 1 successfully');
  }
});

connection.query('SELECT * FROM users', (err, rows) => {
  if (!err) {
    console.log(rows);
  } else {
    console.log(err);
  }
});

module.exports = connection;
