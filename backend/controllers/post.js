const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const Like = require('../models/Like');

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
  let imageArray = [];
  if (req.files) {
    // console.log(req.files[0].filename);
    const newFiles = req.files;
    const imageUrl = `${req.protocol}://${req.get('host')}`;
    newFiles.forEach((f) => {
      // console.log(newFiles[0].filename);
      const images = newFiles[0].filename;
      // console.log(images);
      // let i = 0;

      // console.log(newFiles[0]);
      imageArray.push(`${imageUrl}/images/${images}`);
      // console.log(f[0].filename);
      // i++;
    });
  }

  // try {
  const post = await new Post({
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content,
    status: 'published',
    image: imageArray,
  });
  console.log(imageArray);
  console.log(post);

  const postCreated = await Post.create(post);
  if (postCreated) {
    res.status(201).json({ newPost: post });
  } else {
    res.status(401).json({ error: 'Query not completed' });
  }
  // } catch (e) {
  //   res.status(404).json({ error: 'Marked fields cannot be empty' });
  // }
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

exports.getLikes = async (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  try {
    const likes = await Like.find(postId);
    res.status(200).json({ totalLikes: likes });
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

// exports.getAllPostsUsername = async (req, res, next) => {
//   try {
//     const postList = await Post.findByUsername(req.body.username);
//     res.status(200).json({ postList: postList });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// };
