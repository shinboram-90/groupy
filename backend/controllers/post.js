const Post = require('../models/Post');
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
    const id = req.params.id;
    const post = await Post.findById(id);
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
      likes: 0,
    });

    if (req.files) {
      // POSTMAN IS SHOWING ONLY ONE FILE...

      // await Promise.all(
      // req.files.map(async (file) => {
      //   post.image = `${req.protocol}://${req.get('host')}/images/${
      //     file.filename
      //   }`;

      //     console.log(post.image);
      //   })
      // );
      post.image = `${req.protocol}://${req.get('host')}/images/${
        req.files.image[0].filename
      }`;
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
  const id = req.params.id;
  const post = {
    ...req.body,
    status: 'modified',
    image: `${req.protocol}://${req.get('host')}/images/${
      req.files.image[0].filename
    }`,
  };

  try {
    const getPost = await Post.findById(id);
    const upload = getPost[0].image;

    if (!getPost[0]) {
      console.log(getPost[0]);
      return res.status(404).json({ error: 'Post not found' });
    }
    // This line allow us to verify if the same user can delete his profile
    if (getPost[0].user_id !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized request, id not matching' });
    }

    // Post already has one or multiple images, unlink the existing one(s) and replace it/them
    if (upload) {
      const filename = upload.split('images/')[1];

      fs.unlink(`uploads/images/${filename}`, async () => {
        const updatedPost = await Post.update(post, id);
        // console.log(req.files.avatar);
        if (updatedPost) {
          res.status(200).json({
            modifications: req.body,
            image: req.files,
            message: 'post successfully updated',
          });
        } else {
          res.status(404).json({ message: 'Cannot modify post' });
        }
      });
    } else {
      // Post has no images
      const updatedPost = await Post.update(post, id);
      if (updatedPost) {
        res.status(200).json({
          modifications: req.body,
          image: req.files,
        });
      } else {
        res.status(404).json({ message: 'Cannot modify post' });
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post[0]) {
      return res.status(404).json({ error: 'Post not found' });
    }
    // This line allow us to verify if the same user can delete his profile
    if (post[0].user_id !== req.auth.userId) {
      return res
        .status(403)
        .json({ error: 'Unauthorized request, id not matching' });
    }
    const image = post[0].image;
    if (image) {
      const filename = await image.split('/images/')[1];
      fs.unlink(`uploads/images/${filename}`, () => {
        const deletePost = Post.delete(req.params.id);
        res.status(200).json({
          message: 'Post successfully deleted with all images',
        });
      });
    } else {
      const deletePost = await Post.delete(req.params.id);
      res.status(200).json({ message: 'Post successfully deleted' });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const likes = await Post.updateLikes(req.params.id, req.body.user_id);
    res.status(200).json({ likes: likes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getlikesPost = async (req, res, next) => {
  try {
    const postList = await Post.getLikes(req.params.id);
    res.status(200).json({ postList: postList });
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
