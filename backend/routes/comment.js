const express = require('express');
const router = express.Router();

const { auth, authAdmin } = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/posts/:postId/comments/', auth, commentCtrl.getAllComments);
router.post('/posts/:postId/comments/', auth, commentCtrl.createComment);
router.put('/posts/:postId/comments/:id', auth, commentCtrl.modifyComment);
router.delete('/posts/:postId/comments/:id', auth, commentCtrl.deleteComment);

router.get('/popular/posts/comments/', auth, commentCtrl.countComments);

router.get('/users/:userId/comments/', auth, commentCtrl.getAllCommentsUser);
// router.get('/users/:userId/comments/', auth, commentCtrl.getAllCommentsUser);

// router.put('comments/:id/likes', auth, commentCtrl.likeComment);

// router.put("/:id/admin", auth, multer, commentCtrl.modifyOnepostAdmin);
// router.put("/admin", auth, multer, commentCtrl.modifyAllpostsAdmin);

module.exports = router;
