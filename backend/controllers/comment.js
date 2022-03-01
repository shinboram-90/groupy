const Comment = require('../models/Comment');
const fs = require('fs');

exports.getAllComments = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const commentList = await Comment.findByPost(postId);
    res.status(200).json({ commentList: commentList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.countComments = async (req, res, next) => {
  try {
    const counting = await Comment.countComments();
    res.status(200).json({ message: counting });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getAllCommentsUser = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(req.params.id);
  try {
    const commentList = await Comment.findByUser(userId);
    res.status(200).json({ commentList: commentList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
      content: req.body.content,
      status: 'published',
    });

    const commentCreated = await Comment.create(comment);
    if (commentCreated) {
      res.status(201).json({ newcomment: comment });
    } else {
      res.status(401).json({ error: 'Query not completed' });
    }
  } catch (e) {
    res.status(404).json({ error: 'Marked fields cannot be empty' });
  }
};

exports.modifyComment = async (req, res, next) => {
  const id = req.params.id;

  const commentObject = {
    content: req.body.content,
  };

  try {
    const comment = await Comment.findById(id);
    if (!comment[0]) {
      return res.status(404).json({ error: 'Comment not found' });
    } else if (comment[0].user_id !== req.auth.userId) {
      console.log(comment[0].user_id);
      return res
        .status(403)
        .json({ error: 'Unauthorized request, id not matching' });
    } else {
      const updatedComment = await Comment.update(commentObject, id);
      if (updatedComment) {
        res.status(200).json({
          modifications: req.body,
        });
      } else {
        res.status(404).json({ message: 'Cannot modify this comment' });
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (!comment[0]) {
      return res.status(404).json({ error: 'Comment not found' });
    } else if (comment[0].user_id !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized request, id not matching' });
    } else {
      const deleteComment = await Comment.delete(id);
      if (deleteComment) {
        return res.status(200).json({
          message: 'Comment successfully deleted',
        });
      } else {
        res.status(404).json({ message: 'Cannot delete this comment.' });
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
