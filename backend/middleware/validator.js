const { body, validationResult } = require('express-validator');
const User = require('../models/User');

exports.checkBody = [
  body('username', 'Username must be a minimum of 3 characters length')
    .isLength({ min: 3 })
    .trim()
    .exists()
    .escape()
    .not()
    .isEmpty()
    .custom(async (value) => {
      const usernameIsFree = await User.findByUsername(value);
      if (usernameIsFree.length > 0) {
        return Promise.reject('Username already in use');
      }
    }),

  body('email', 'Invalid email address')
    .isEmail()
    .trim()
    .exists()
    .escape()
    .not()
    .isEmpty()
    .normalizeEmail()
    .custom(async (value) => {
      const emailIsFree = await User.findByEmail(value);
      if (emailIsFree.length > 0) {
        return Promise.reject('Email already in use');
      }
    }),

  body('password', 'Password must be a minimum of 8 characters length')
    .isLength({ min: 8 })
    .exists()
    .trim()
    .escape()
    .not()
    .isEmpty(),

  body('first_name', 'First name must be a minimum of 2 characters length')
    .isLength({ min: 2 })
    .optional()
    .trim()
    .escape()
    .not()
    .isEmpty(),

  body('last_name', 'Last name must be a minimum of 2 characters length')
    .isLength({ min: 2 })
    .optional()
    .trim()
    .escape()
    .not()
    .isEmpty(),

  body('phone', 'Please enter a valid phone numer')
    .isMobilePhone()
    .optional()
    .trim()
    .escape()
    .not()
    .isEmpty(),
];

exports.checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
