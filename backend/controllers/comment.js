const Comment = require('../models/Comment');
const fs = require('fs');

exports.getAllComments = async (req, res, next) => {
  try {
    const commentList = await Comment.findAll();
    res.status(200).json({ commentList: commentList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOneComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    console.log(comment.id);
    res.status(200).json({ comment: comment });
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

    const commentCreated = await comment.create(comment);
    if (commentCreated) {
      res.status(201).json({ newcomment: comment });
    } else {
      res.status(401).json({ error: 'Query not completed' });
    }
  } catch (e) {
    res.status(404).json({ error: 'Marked fields cannot be empty' });
  }
};
