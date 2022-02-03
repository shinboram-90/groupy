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

Post.create = async (newPost) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO posts SET ?', newPost, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log('New post succesfully published');
      return resolve(res);
    });
  });
};

Post.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM posts WHERE id=?', id, (err, post) => {
      if (err) {
        return reject(err);
      }
      console.log(
        `Post title: ${post[0].title} with id no.${post[0].id} found`
      );
      return resolve(post);
    });
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

Post.update = async (post, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE posts SET title=?, content=?, image=?, WHERE id=?`,
      [post.title, post.content, post.image, id],
      (err, updatedPost) => {
        if (err) {
          return reject(err);
        }
        console.log('Post updated infos:', updatedPost);
        return resolve(updatedPost);
      }
    );
  });
};

Post.delete = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM posts WHERE id=?', id, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(`Post with id no.${id} successfully deleted`);
      return resolve(res);
    });
  });
};

Post.updateLikes = async (id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE posts SET like_user_id = like_user_id || ?, likes = likes + 1 WHERE NOT (like_user_id @> ?) AND id = ?`,
      [userId, id],
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

module.exports = Post;
