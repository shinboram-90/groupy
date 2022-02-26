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
    // console.log(req.files.image[0].filename);

    const newFiles = Object.values(req.files.image);
    const imageUrl = `${req.protocol}://${req.get('host')}`;
    newFiles.forEach((f) => {
      imageArray.push(`${imageUrl}/images/${f.filename}`);
    });
  }

  // try {
  const post = new Post({
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content,
    status: 'published',
    image: JSON.stringify(imageArray),
  });
  // console.log(imageArray);
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
  const postId = req.params.id;
  console.log(postId);
  try {
    const likes = await Like.find(postId);
    res.status(200).json({ totalLikes: likes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.updateLike = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.body.user_id;
  const like = new Like({
    user_id: userId,
    post_id: postId,
    is_liked: 1,
  });

  try {
    let findUserLike = await Like.findByUser(postId, userId);
    if (findUserLike.length !== 1) {
      try {
        findUserLike = await Like.create(like);
        res.status(200).json({ userFirstLike: findUserLike });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      try {
        if (findUserLike[0].is_liked === 1) {
          findUserLike = await Like.dislikeUpdate(postId, userId);
          console.log(findUserLike);
          res.status(200).json({ userLike: findUserLike });
        } else {
          findUserLike = await Like.likeUpdate(postId, userId);
          console.log(findUserLike);
          res.status(200).json({ userLike: findUserLike });
        }
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

// exports.likePost = async (req, res, next) => {
//   const postId = req.params.id;
//   const like = new Like({
//     user_id: req.body.user_id,
//     post_id: postId,
//     is_liked: true,
//   });
//   // const userLike = req.body.is_Liked;
//   // const postId = req.params.id;
//   try {
//     const userGivesLike = await Like.create(like);
//     res.status(200).json({ userLike: userGivesLike });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// };

// exports.updateLike = async (req, res, next) => {
//   const postId = req.params.id;
//   const like = new Like({
//     user_id: req.body.user_id,
//     post_id: postId,
//     is_liked: 1,
//   });
//   try {
//     const userChoice = await Like.likeUpdate(postId);
//     res.status(200).json({ userLike: userChoice });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// };
