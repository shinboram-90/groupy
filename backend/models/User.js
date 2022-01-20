const db = require('../dbConnection');

// const passwordValidator = 'password-validator';
// exports.schemaPV = new passwordValidator();

// schemaPV.is().min(8).is().max(35);

const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.admin = user.admin;
  this.biography = user.biography;
  this.status = user.status;
  this.created_at = new Date();
  this.updated_at = new Date();
};

User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.findById = (id, result) => {
  db.query('SELECT * FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.delete = (id, result) => {
  db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = (result) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log(`error: ${err}`);
      result(null, err);
    } else {
      console.log(`User list: ${res}`);
      result(null, res);
    }
  });
};

User.update = (result) => {
  db.query(
    `UPDATE users SET username = "COVID19", email = "testemail", password = "testpass", biography = "bloody hell" WHERE id = "13"`,
    (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        result(null, err);
      } else {
        console.log(`User list: ${res}`);
        result(null, res);
      }
    }
  );
};

module.exports = User;
