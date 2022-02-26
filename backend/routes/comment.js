const express = require('express');
const router = express.Router();

const { auth, authAdmin } = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/comments', auth, commentCtrl.getAllComments);
router.get('/comments/:id', auth, commentCtrl.getOneComment);

router.post('/comments', commentCtrl.createComment);
// router.put('/comments/:id', auth, multer, commentCtrl.modifyComment);
// router.delete('/comments/:id', auth, commentCtrl.deleteComment);

// router.put('comments/:id/likes', auth, commentCtrl.likeComment);

// router.put("/:id/admin", auth, multer, commentCtrl.modifyOnepostAdmin);
// router.put("/admin", auth, multer, commentCtrl.modifyAllpostsAdmin);

module.exports = router;
