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

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.signin(username, password, (err, user) => {
    if (username === '' && password === '') {
      res.send('Please enter your username and password');
    } else if (user.length > 0) {
      req.loggedin = true;
      res.json({
        error: false,
        message: `${user[0]['username']} user successfully signed in`,
      });
      // res.redirect('/home');
    } else {
      res.send('Incorrect username and/or password!');
    }
    res.end();
  });
};

exports.updateUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  //   res
  //     .status(400)
  //     .send({ error: true, message: 'Please provide all required fields' });
  // } else {
  User.update(username, password, (err, user2) => {
    if (!username && !password) {
      res.send(`${err} Please enter your username and password`);
    } else {
      res.send(err);
      res.json({
        error: false,
        message: 'User updated successfully!',
        data: user2,
      });
    }
  });
};
// };

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
      db.query('INSERT INTO users SET ?', user, (error, result, fields) => {
        if (error) {
          return res.status(400).json({ message: error });
        }
        return result
          .status(201)
          .json({ message: 'Votre compte a bien été créé !' });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
