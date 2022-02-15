const express = require('express');
const router = express.Router();

const { auth, authAdmin } = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/posts', postCtrl.getAllPosts);
// router.get('/posts/users/:id', auth, postCtrl.getAllPostsUsername);
router.get('/posts/:id', postCtrl.getOnePost);

router.post('/posts', auth, multer, postCtrl.createPost);
router.put('/posts/:id', auth, multer, postCtrl.modifyPost);
router.delete('/posts/:id', auth, postCtrl.deletePost);

router.get('posts/likes/:id', auth, postCtrl.getlikesPost);
router.put('posts/likes/:id', auth, postCtrl.likePost);

// router.put("/:id/admin", auth, multer, postCtrl.modifyOnepostAdmin);
// router.put("/admin", auth, multer, postCtrl.modifyAllpostsAdmin);

module.exports = router;
