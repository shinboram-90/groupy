const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbConnection');
const User = require('../models/User');
const fs = require('fs');

exports.createUser = (req, res, next) => {
  const newUser = new User(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required fields' });
  } else {
    User.create(newUser, (err, userId) => {
      if (err) res.send(err);
      res.json({
        error: false,
        message: 'User created successfully!',
        data: userId,
      });
    });
  }
};

exports.getAllUsers = (req, res, next) => {
  User.findAll((error, user) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "impossible d'afficher les listes des membres" });
    }
    return res.status(200).json(user);
  });
};

exports.getOneUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.send(err);
    res.status(200).json(user);
  });
};

exports.deleteUser = (req, res, next) => {
  User.delete(req.params.id, (err, user) => {
    if (err) res.send(err);
    res.json({ error: false, message: 'User successfully deleted' });
  });
};

exports.updateUser = (req, res, next) => {
  // let updateUser = User.findById(req.params.id, (err, user) => {
  //   if (err) res.send(err);
  //   res.status(200).json(user);
  // });
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide all required fields' });
  } else {
    User.update((erreur, userId) => {
      if (erreur) res.send(err);
      res.json({
        error: false,
        message: 'User updated successfully!',
        data: userId[0],
      });
    });
  }
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.loggedin = true;
          req.username = username;
          res.json({
            error: false,
            message: `${username} user successfully signed in`,
          });
          // res.redirect('/home');
        } else {
          res.send('Incorrect Username and/or Password!');
        }
        res.end();
      }
    );
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
};

exports.signup = (req, res, next) => {
  // const cryptoEmail = crypt.MD5(req.body.email).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        admin: 1,
        status: 1,
      });
      db.query('INSERT INTO users SET ?', user, (error, results, fields) => {
        if (error) {
          return res.status(400).json({ message: error });
        }
        return res
          .status(201)
          .json({ message: 'Votre compte a bien été créé !' });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
