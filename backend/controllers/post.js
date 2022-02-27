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

  try {
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
  } catch (e) {
    res.status(404).json({ error: 'Marked fields cannot be empty' });
  }
};

// exports.modifyPost = async (req, res, next) => {
//   // const post = {
//   //   ...req.body,
//   //   image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//   // };

//   try {
//     const getPost = await Post.findById(req.params.id);
//     const upload = getPost[0];

//     res.status(200).json({ modifiedPost: upload });
//     console.log(req.file);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// };

exports.modifyPost = async (req, res, next) => {
  const id = req.params.id;
  // building the user object, spread gets all details, just building the avatar file
  const post = {
    ...req.body,
    image: `${req.protocol}://${req.get('host')}/uploads/images/${
      req.files.image[0].filename
    }`,
  };

  try {
    const getPost = await Post.findById(id);
    const image = getPost[0].image;
    console.log(eval(image));

    // Post already has image(s), unlink the existing one(s) and replace it/them
    if (image) {
      // let imageArray = [];
      // const newFiles = Object.values(req.files.image);
      // const imageUrl = `${req.protocol}://${req.get('host')}`;
      // newFiles.forEach((f) => {
      //   imageArray.push(`${imageUrl}/images/${f.filename}`);
      // });

      objectImage = eval(image);
      //   const filenames = objectImage.map((filename) => {
      //     myFile = filename.split('images/')[1];
      //     console.log(myFile);
      //   });
      //   console.log(filenames);
      for (let i in objectImage) {
        console.log(i);
      }
    }

    //     fs.unlink(`uploads/images/${filename}`, async () => {
    //       const updatedPost = await Post.update(post, id);
    //       // console.log(req.files.image);
    //       if (updatedPost) {
    //         res.status(200).json({
    //           modifications: req.body,
    //           image: req.files,
    //         });
    //       } else {
    //         res.status(404).json({ message: 'Cannot modify post infos' });
    //       }
    //     });
    // }

    // } else {
    //   // Post has no image
    //   const updatedPost = await Post.update(post, id);
    //   if (updatedPost) {
    //     res.status(200).json({
    //       modifications: req.body,
    //       image: req.files,
    //     });
    //   } else {
    //     res.status(404).json({ message: 'Cannot modify post infos' });
    //   }
    // }
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

    // This line allow us to verify if the post's owner can delete his post
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

// <------------------- HANDLING LIKES ------------------->

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

exports.giveLike = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.body.user_id;

  const like = new Like({
    user_id: userId,
    post_id: postId,
    is_liked: 1,
  });

  try {
    // Need to find out if the user has already liked the post or not
    let findUserLike = await Like.findByUser(postId, userId);

    // The user hasn't liked any posts yet
    if (findUserLike.length !== 1) {
      try {
        findUserLike = await Like.create(like);
        res.status(200).json({ userFirstLike: findUserLike });
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      // Already liked/disliked one post, will update the boolean value
      try {
        findUserLike = await Like.likeUpdate(postId, userId);
        console.log(findUserLike);
        res.status(200).json({ userLike: findUserLike });
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
