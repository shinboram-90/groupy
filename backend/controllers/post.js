const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

const fs = require('fs');

exports.getAllPosts = async (req, res, next) => {
  try {
    const postList = await Post.findAll();
    res.status(200).json({ postList: postList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post: post });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      status: 'published',
      image: req.files,
    });

    if (req.files) {
      await Promise.all(
        req.files.map(async (file) => {
          post.image = `${req.protocol}://${req.get('host')}/images/${
            file.filename
          }`;

          console.log(post.image);
        })
      );
    }

    const postCreated = await Post.create(post);
    if (postCreated) {
      // /!\ CANNOT display multiple images in postman for now..
      res.status(201).json({ newPost: post });
    } else {
      res.status(401).json({ error: 'Query not completed' });
    }
  } catch (e) {
    res.status(404).json({ error: 'Marked fields cannot be empty' });
  }
};

exports.modifyPost = async (req, res, next) => {
  // const post = {
  //   ...req.body,
  //   image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  // };

  try {
    const getPost = await Post.findById(req.params.id);
    const upload = getPost[0];

    res.status(200).json({ modifiedPost: upload });
    console.log(req.file);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.delete(req.params.id);
    res.status(200).json({
      message: 'Post successfully deleted',
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const userList = await Post.findAllActive();
    res.status(200).json({ userList: userList });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
