const db = require('../dbConnection');

const passwordValidator = 'password-validator';
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
      console.error(err);
      result(err, null);
    } else {
      console.log('Generated id no.:', res.insertId);
      result(null, newUser);
    }
  });
};

User.findById = (id, result) => {
  db.query('SELECT * FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log('id', res[0]['id']);
      result(null, res);
    }
  });
};

User.findByUsername = (username, result) => {
  db.query(
    'SELECT username FROM users WHERE username = ?',
    username,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        console.log('id', res[0].username);
        result(null, res);
      }
    }
  );
};

User.signin = (username, password, result) => {
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, res) => {
      if (err) {
        console.error(err);
        result(err, null);
      } else {
        console.log('Entered username:', res);
        result(null, res);
      }
    }
  );
};

User.delete = (id, result) => {
  db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.error(err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = (result) => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error:', err);
      result(null, err);
    } else {
      console.log(res);
      result(null, res);
    }
  });
};

User.update = (user, id, result) => {
  db.query(`UPDATE users SET ? WHERE id=?`, [user, id], (err, res) => {
    if (err) {
      console.log('error:', err);
      result(null, err);
    } else {
      console.log('User updated:', user);
      result(null, res);
    }
  });
};

module.exports = User;
