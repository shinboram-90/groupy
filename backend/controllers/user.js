const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbConnection');
const User = require('../models/User');
const fs = require('fs');

exports.createUser = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const createdUser = await User.create(newUser);
    res.status(200).json({ newUser: newUser });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
// if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//   res
//     .status(400)
//     .send({ error: true, message: 'Please provide all required fields' });

exports.getAllUsers = async (req, res, next) => {
  try {
    const userList = await User.findAll();
    res.status(200).json({ userList: userList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const userElements = await User.findById(req.params.id);
    res.status(200).json({ user: userElements });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userElements = await User.delete(req.params.id);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const loggedInUser = await User.signin(username, password);
    if (username === '' && password === '') {
      res.send('Please enter your username and password');
    } else if (loggedInUser[0]) {
      if (
        loggedInUser[0].username === username &&
        loggedInUser[0].password === password
      ) {
        res.status(200).json({ user: loggedInUser });
      } else {
        res.send('Incorrect Username and/or Password!');
      }
    } else {
      res.send('Incorrect Username and/or Password!');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.updateUser = async (req, res, next) => {
  const updateUser = req.body;
  const id = req.params.id;
  try {
    const updatedUser = await User.update(updateUser, id);
    res.status(200).json({ modifications: req.body });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.signup = async (req, res, next) => {
  // const cryptoEmail = crypt.MD5(req.body.email).toString();
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      admin: 1,
      status: 1,
    });

    try {
      User.register(user);
      res.status(201).json({ RegisteredAs: user });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};
