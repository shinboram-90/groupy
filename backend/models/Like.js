const pool = require('../dbConnection');

const Like = function (like) {
  this.user_id = like.user_id;
  this.post_id = like.post_id;
  this.is_liked = like.is_liked;
};

Like.find = async (postId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT l.post_id, COUNT(l.post_id) total FROM likes l INNER JOIN posts p ON l.post_id = p.id WHERE l.post_id = ?',
      postId,
      (err, likes) => {
        if (err) {
          return reject(err);
        }
        console.log(likes);
        return resolve(likes);
      }
    );
  });
};

Like.update = async (like) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE likes l INNER JOIN users u ON u.id = l.user_id INNER JOIN posts p ON p.id = l.post_id SET l.is_liked = ? WHERE l.id = ?',
      [like.is_liked, like.id],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        console.log(like);
        return resolve(res);
      }
    );
  });
};

module.exports = Like;
