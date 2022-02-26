const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  // unix_socket: '/Applications/MAMP/Library/bin/mysql',
  // /Applications/MAMP/Library/bin/mysqld --skip-grant-tables
  // /Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot

  // OMG Mamp use another port, and brew use default mysqm port 3306
  // Mamp use this foder: /Applications/MAMP/Library/bin/mysql
  // Brew use his own folder : /usr/local/Cellar/mysql/(version...)
  // with brew you don't need use path to execute bin files, just type 'mysql -uroot -p' on the terminal
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(
    `Connection created with Mysql successfully, connected as id ${connection.threadId}`
  );
});

module.exports = pool;
