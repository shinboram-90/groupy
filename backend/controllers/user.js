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
    } else {
      console.log(user[0].status);
      return res.status(200).json(user);
    }
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
    res.json({ message: 'User successfully deleted' });
  });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.signin(username, password, (err, user) => {
    console.log(username);
    if (username === '' && password === '') {
      res.send('Please enter your username and password');
    } else if (user[0]) {
      if (username === user[0].username && password === user[0].password) {
        console.error(user[0].username);
        req.loggedin = true;
        res.json({
          error: false,
          message: `${user[0]['username']} user successfully signed in`,
        });
      } else {
        res.send('Incorrect Username and/or Password!');
      }
      // res.redirect('/home');
    } else {
      res.send('Incorrect Username and/or Password!');
    }
    // res.end();
  });
};

exports.updateUser = (req, res, next) => {
  // let updateUser = User.findById(req.params.id, (err, user) => {
  //   if (err) res.send(err);
  //   res.status(200).json(user);
  // });
  const updateUser = req.body;
  const id = req.params.id;

  User.update(updateUser, id, (err, rows, fields) => {
    if (err) res.send(err);
    return res.status(200).json({
      message: 'Vos information ont bien été modifié !',
      updateUser,
    });
  });
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
      db.query('INSERT INTO users SET ?', user, (error, result, fields) => {
        if (error) {
          return res.status(400).json({ message: error });
        }
        return res
          .status(201)
          .json({ message: 'Votre compte a bien été créé !', result });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
