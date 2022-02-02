const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/posts/:id', auth, postCtrl.getOnePost);

router.post('/posts/:userid', auth, multer, postCtrl.createPost);
router.put('/posts/:userid/:id', auth, multer, postCtrl.modifyPost);
router.delete('posts/:userid/:id', auth, postCtrl.deletePost);
// router.post("posts/:id/like", auth, postCtrl.likeSauce);

// router.put("/:id/admin", auth, multer, postCtrl.modifyOnepostAdmin);
// router.put("/admin", auth, multer, postCtrl.modifyAllpostsAdmin);

module.exports = router;
