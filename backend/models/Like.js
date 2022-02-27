const pool = require('../dbConnection');

const Like = function (like) {
  this.user_id = like.user_id;
  this.post_id = like.post_id;
  this.is_liked = like.is_liked;
};

Like.find = async (postId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT COUNT(l.id) total FROM likes l INNER JOIN posts p ON l.post_id = p.id WHERE p.id = ? and l.is_liked = 1',
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

Like.findByUser = async (postId, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM likes l INNER JOIN posts p ON l.post_id = p.id INNER JOIN users u ON l.user_id = u.id WHERE p.id = ? AND u.id = ?',
      [postId, userId],
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

Like.create = async (like) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO likes SET ?`, like, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(res);
      return resolve(res);
    });
  });
};

Like.likeUpdate = async (postId, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE likes l INNER JOIN users u ON u.id = l.user_id INNER JOIN posts p ON p.id = l.post_id SET l.is_liked = (CASE WHEN l.is_Liked = 1 THEN 0 ELSE 1 END) WHERE p.id = ? AND u.id = ?',
      [postId, userId],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        console.log(res);
        return resolve(res);
      }
    );
  });
};

module.exports = Like;
