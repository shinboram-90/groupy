const pool = require('../dbConnection');

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

User.create = (newUser) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(newUser);
      return resolve(res);
    });
  });
};

User.findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = ?', id, (err, user) => {
      if (err) {
        return reject(err);
      }
      console.log(user);
      return resolve(user);
    });
  });
};

User.signin = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, user) => {
        if (err) {
          return reject(err);
        }
        console.log(user);
        return resolve(user);
      }
    );
  });
};

User.register = (user) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users SET ?', user, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(user);
      return resolve(res);
    });
  });
};

User.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(`User with id no.${id} successfully deleted`);
      return resolve(res);
    });
  });
};

User.findAll = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (err, users) => {
      if (err) {
        return reject(err);
      }
      console.log(users);
      return resolve(users);
    });
  });
};

User.update = (user, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET username=?, email=?, password=?, biography=? WHERE id=?`,
      [user.username, user.email, user.password, user.biography, id],
      (err, updatedUser) => {
        if (err) {
          return reject(err);
        }
        console.log('User updated:', user);
        return resolve(updatedUser);
      }
    );
  });
};

User.isValid = (username, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT password FROM users WHERE username = ? OR email = ?`,
      [password, username, email],
      (err, validUser) => {
        if (err) {
          return reject(err);
        }
        console.log('Entered credentials for:', username);
        return resolve(validUser);
      }
    );
  });
};

module.exports = User;
