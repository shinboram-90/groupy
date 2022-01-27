const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');

// const passwordValidator = require('password-validator');

// const pool = require('../dbConnection');

// exports.createUser = async (req, res, next) => {
//   const newUser = new User({
//     username : req.body.username,
//     email: req.body.email,
//     password: req.body.password
//   });
//   try {
//     const createdUser = await User.create(newUser);
//     res.status(200).json({ newUser: newUser });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// };
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
  // const schema = new passwordValidator();

  // schema.is().min(8).has().uppercase;
  // const mypass = await schema.validate(req.body.password);
  // if (mypass) {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: 1,
      is_active: true,
    });
    const userCreated = await User.create(user);
    if (userCreated) {
      res.status(201).json({ RegisteredAs: user });
    } else {
      res.status(401).json({ error: 'Query not completed' });
    }
  } catch (e) {
    res.status(404).json({ error: 'Marked fields cannot be empty' });
  }
  // } else {
  //   console.log('nope');
  // }
};
// exports.login = async (req, res, next) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.password;

//     if (username && password) {
//       pool.query(
//         'SELECT * FROM users WHERE username = ?',
//         username,
//         (error, results, fields) => {
//           if (results.length > 0) {
//             bcrypt.compare(password, results[0].password).then((good) => {
//               if (!good) {
//                 res.status(401).json({ message: 'Incorrect password' });
//               } else {
//                 console.log(`Connected as: ${username} ${results[0].password}`);

//                 res.status(200).json({
//                   message: results,
//                 });
//               }
//             });
//           } else {
//             res.status(401).json({ message: 'Unknown data' });
//           }
//         }
//       );
//     } else {
//       res
//         .status(500)
//         .json({ message: 'Username and password cannot be blank' });
//     }
//   } catch (err) {
//     console.error(`Something went wrong: ${err}`);
//   }
// };

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (
    (username === '' && password === '') ||
    (email === '' && password === '')
  ) {
    res
      .status(401)
      .json({ message: 'username || email and password cannot be blank' });
  }
  try {
    const loggedInUser = await User.signin(username, email);
    if (loggedInUser[0]) {
      const match = await bcrypt.compare(password, loggedInUser[0].password);
      if (match) {
        res.status(200).json({ user: loggedInUser });
      } else {
        res.status(400).json({ message: 'Password is incorrect' });
      }
    } else {
      res.status(400).json({ message: 'Invalid username or email' });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
