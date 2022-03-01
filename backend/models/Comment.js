const pool = require('../dbConnection');

const Comment = function (comment) {
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.status = comment.status;
  this.content = comment.content;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Comment.findByPost = async (postId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT  c.*, u.avatar, u.username, p.title FROM comments c INNER JOIN users u ON c.user_id = u.id INNER JOIN posts p ON c.post_id = p.id WHERE p.id=? ORDER BY c.created_at DESC',
      postId,
      (err, comments) => {
        if (err) {
          return reject(err);
        }
        console.log(comments);
        return resolve(comments);
      }
    );
  });
};

Comment.create = async (newComment) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO comments SET ?', newComment, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(newComment);
      return resolve(res);
    });
  });
};

Comment.findByUser = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT c.*, u.username FROM comments c INNER JOIN users u ON u.id = c.user_id LEFT JOIN posts p ON p.id = c.post_id WHERE u.id=? ORDER BY c.created_at DESC',
      userId,
      (err, comment) => {
        if (err) {
          return reject(err);
        }
        console.log(comment);
        return resolve(comment);
      }
    );
  });
};

Comment.countComments = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT p.title, p.id, COUNT(c.id) total FROM comments c INNER JOIN posts p ON p.id = c.post_id GROUP BY p.id ORDER BY total DESC LIMIT 10',

      (err, count) => {
        if (err) {
          return reject(err);
        }
        console.log(count);
        return resolve(count);
      }
    );
  });
};

Comment.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM comments WHERE id=? AND status = "published"',
      id,
      (err, comment) => {
        if (err) {
          return reject(err);
        }
        console.log(`Comment with id no.${id} found`);
        return resolve(comment);
      }
    );
  });
};

Comment.update = async (comment, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE comments c SET c.content = ? WHERE c.id=?`,
      [comment, id],
      (err, updatedComment) => {
        if (err) {
          return reject(err);
        }
        console.log('Comment updated infos:', updatedComment);
        return resolve(updatedComment);
      }
    );
  });
};

Comment.delete = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM comments WHERE id=?', id, (err, res) => {
      if (err) {
        return reject(err);
      }
      console.log(`Comment with id no.${id} successfully deleted`);
      return resolve(res);
    });
  });
};

// Comment.updateLikes = async (id, userId) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       `UPDATE comments SET like_user_id = like_user_id || ?, likes = likes + 1 WHERE NOT (like_user_id @> ?) AND id = ?`,
//       [userId, id],
//       (err, likeComment) => {
//         if (err) {
//           return reject(err);
//         }
//         console.log(`Like/dislike given by user Id ${userId}`);
//         return resolve(likeComment);
//       }
//     );
//   });
// };

module.exports = Comment;
