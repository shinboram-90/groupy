const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');

const { auth, authAdmin } = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

// router.post('/imageupload', userCtrl.upload);

router.post(
  '/signup',
  validator.checkBody,
  validator.checkRules,
  userCtrl.signup
);
router.post('/login', userCtrl.login);

// Need authentification in order to do so
router.get('/logout', userCtrl.logout);
router.get('/users', userCtrl.getAllActive);
router.get('/users/:id', userCtrl.getOneUser);
router.put(
  '/users/:id',

  multer,
  validator.checkBody,
  validator.checkRules,
  userCtrl.modifyUser
);
router.delete('/users/:id', auth, userCtrl.deleteUser);

router.put('/dashboard/users/:id', authAdmin, userCtrl.modifyStatus);
router.get('/dashboard', authAdmin, userCtrl.getAllUsers);

module.exports = router;
