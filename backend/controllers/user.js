const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');

// const passwordValidator = require('password-validator');

exports.logout = async (req, res, next) => {
  try {
    return res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'Successfully logged out 😏 🍀' });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getAllActive = async (req, res, next) => {
  try {
    const userList = await User.findAllActive();
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
    const user = await User.findById(req.params.id);
    if (!user[0]) {
      return res.status(404).json({ error: 'User not found' });
    }

    // This line allow us to verify if the same user can delete his profile
    if (user[0].id !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized request, id not matching' });
    }
    const avatar = user[0].avatar;
    if (avatar) {
      const filename = await avatar.split('/avatars/')[1];
      fs.unlink(`uploads/avatars/${filename}`, () => {
        const deleteUser = User.delete(req.params.id);
        res.status(200).json({
          message: 'User successfully deleted with all images',
        });
      });
    } else {
      const deleteUser = await User.delete(req.params.id);
      res.status(200).json({ message: 'User successfully deleted' });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.modifyUser = async (req, res, next) => {
  const id = req.params.id;

  // building the user object, spread gets all details, just building the avatar file
  const user = {
    ...req.body,
    avatar: `${req.protocol}://${req.get('host')}/avatars/${
      req.files.avatar[0].filename
    }`,
  };
  try {
    const getUser = await User.findById(id);
    console.log(req.files);
    const avatar = getUser[0].avatar;

    // User already has one avatar, unlink the existing one and replace it
    if (avatar) {
      const filename = avatar.split('avatars/')[1];

      fs.unlink(`uploads/avatars/${filename}`, async () => {
        const updatedUser = await User.update(user, id);
        // console.log(req.files.avatar);
        if (updatedUser) {
          res.status(200).json({
            modifications: req.body,
            avatar: avatar,
          });
        } else {
          res.status(404).json({ message: 'Cannot modify user infos' });
        }
      });
    } else {
      // User has no avatar
      const updatedUser = await User.update(user, id);
      if (updatedUser) {
        res.status(200).json({
          modifications: req.body,
          avatar: req.files,
        });
      } else {
        res.status(404).json({ message: 'Cannot modify user infos' });
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,

      // Set to admin for test purposes, need to change back to 1 by default : "user"
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
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Check first if input is empty before the db query
  if (
    (username === '' && password === '') ||
    (email === '' && password === '')
  ) {
    res
      .status(401)
      .json({ message: 'Username || email and password cannot be blank' });
  }

  // Post request where we need either the username or the email to login
  try {
    const loggedInUser = await User.signin(username, email);
    if (loggedInUser[0]) {
      const match = await bcrypt.compare(password, loggedInUser[0].password);

      // Password is compared with bcrypt, if true assign cookie (expires in 1 month) and token
      if (match) {
        const maxAge = 72 * 60 * 60;
        const token = jwt.sign(
          { userId: loggedInUser[0].id, role: loggedInUser[0].role },
          process.env.TOKEN_SECRET,
          {
            expiresIn: maxAge,
          }
        );
        res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: maxAge * 1000,
          })
          .status(200)
          .json({
            message: 'message: Logged in successfully 😊 👌',
            user: loggedInUser,
            token: token,
          });
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

// ------------- ADMIN SECTION --------------

exports.getAllUsers = async (req, res, next) => {
  try {
    const userList = await User.findAll();
    res.status(200).json({ userList: userList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.modifyStatus = async (req, res, next) => {
  // 0 is false and 1 is true
  try {
    const findUser = await User.updateStatus(req.body.is_active, req.params.id);
    res
      .status(200)
      .json({ message: 'User status modified by Admin', user: findUser });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
