const pool = require('../dbConnection');

const Post = function (post) {
  this.user_id = post.user_id;
  this.title = post.title;
  this.content = post.content;
  this.image = post.image;
  this.status = post.status;
  this.likes = post.likes;
  this.like_user_id = post.like_user_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Post.findAll = async () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
      if (err) {
        return reject(err);
      }
      console.log(posts);
      return resolve(posts);
    });
  });
};

Post.create = async (newPost, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO posts SET ? where userId=?',
      [newPost, userId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        console.log(newPost);
        return resolve(res);
      }
    );
  });
};

Post.findById = async (id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM posts WHERE id=? and user_Id=?',
      [id, userId],
      (err, post) => {
        if (err) {
          return reject(err);
        }
        console.log(`${post[0].title} with id no.${post[0].id} found`);
        return resolve(post);
      }
    );
  });
};

Post.findByUsername = async (post, user) => {
  pool.query(
    'SELECT * FROM posts JOIN users on ? = ? WHERE user.username = ?',
    [post.user_id, user.id, user.username],
    (err, postsByUsername) => {
      if (err) {
        return reject(err);
      }
      console.log('All posts from a particular user' + postsByUsername);
      return resolve(postsByUsername);
    }
  );
};

Post.update = async (post, id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE posts SET title=?, content=?, image=?, WHERE id=? and user_Id =?`,
      [post.title, post.content, post.image, id, userId],
      (err, updatedPost) => {
        if (err) {
          return reject(err);
        }
        console.log('Post updated infos:', post);
        return resolve(updatedPost);
      }
    );
  });
};

Post.delete = async (id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM posts WHERE id=? and user_Id=?',
      [id, userId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        console.log(`Post with id no.${id} successfully deleted`);
        return resolve(res);
      }
    );
  });
};

Post.updateLike = async (like_user_id, id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE posts SET like_user_id=?, WHERE id=? and user_Id =?`,
      [like_user_id, id, userId],
      (err, likePost) => {
        if (err) {
          return reject(err);
        }
        console.log(`Like/dislike given by user Id ${userId}`);
        return resolve(likePost);
      }
    );
  });
};
