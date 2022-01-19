const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

router.get('/users', userCtrl.getAllUsers);
router.get('/users/:id', userCtrl.getOneUser);

router.put('users/:id', userCtrl.updateUser);
router.delete('users/:id', userCtrl.deleteUser);

// router.put("/:id/admin", auth, multer, userCtrl.modifyOneUserAdmin);
// router.put("/admin", auth, multer, userCtrl.modifyAllUsersAdmin);

module.exports = router;
