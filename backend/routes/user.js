const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');

const auth = require('../middleware/auth');
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
router.get('/logout', auth, userCtrl.logout);
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/users/:id', auth, userCtrl.getOneUser);
router.put(
  '/users/:id',
  auth,
  multer,
  validator.checkBody,
  validator.checkRules,

  userCtrl.updateUser
);
router.delete('/users/:id', auth, userCtrl.deleteUser);

// router.put("/:id/admin", auth, multer, userCtrl.modifyOneUserAdmin);
// router.put("/admin", auth, multer, userCtrl.modifyAllUsersAdmin);

module.exports = router;
