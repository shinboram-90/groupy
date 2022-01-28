const pool = require('../dbConnection');

const User = function (user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
  this.biography = user.biography;
  this.is_active = user.is_active;
  this.avatar = user.avatar;
  this.created_at = new Date();
  this.updated_at = new Date();
  this.first_name = user.first_name; //optional si j'ai le temps
  this.last_name = user.last_name; //optional
  this.phone = user.phone; //optional
  // add job if time
};

User.create = async (newUser) => {
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

User.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT email FROM users WHERE email = ?',
      email,
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

User.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT username FROM users WHERE username = ?',
      username,
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

User.signin = async (username, email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email],
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

User.findAll = async () => {
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
      `UPDATE users SET password=?, biography=?, first_name = ?, last_name = ?, phone = ?, avatar = ? WHERE id=?`,
      [
        user.password,
        user.biography,
        user.first_name,
        user.last_name,
        user.phone,
        user.avatar,
        id,
      ],
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

module.exports = User;
