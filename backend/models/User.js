// const passwordValidator = 'password-validator';
// const db = require('./db.js');
// const mysql = require('mysql');
// exports.schemaPV = new passwordValidator();

// schemaPV.is().min(8).is().max(35);

const User = function (user) {
  this.id = user.id;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.admin = user.admin;
  this.biography = user.biography;
  this.status = user.status;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
};

module.exports = User;
// User.create = (newUser, result) => {
//   db.query('INSERT INTO users SET ?', newUser, (err, res) => {
//     if (err) {
//       console.log('error:', err);
//       result(err, null);
//       return;
//     }

//     console.log('created users; ', { id: res.insertId, ...newUser });
//     result(null, { id: res.insertId, ...newUser });
//   });
// };
