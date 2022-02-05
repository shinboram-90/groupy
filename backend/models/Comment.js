const pool = require('../dbConnection');

const Comment = function (comment) {
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.status = comment.status;
  this.content = comment.content;
  this.image = comment.image;
  this.likes = comment.likes;
  this.like_user_id = comment.like_user_id;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Comment.findAll = async (post_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT *, users.username FROM comments INNER JOIN users ON users.id = comments.user_id WHERE post_id = ?',
      // 'SELECT * FROM comments INNER JOIN posts ON post.id = comment.post_id LEFT JOIN users ON user.id = comment.user_id WHERE id =?',
      post_id,
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

Comment.findById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM comments WHERE id=?', id, (err, comment) => {
      if (err) {
        return reject(err);
      }
      console.log(`Comment with id no.${comment[0].id} found`);
      return resolve(comment);
    });
  });
};

// Comment.findByUsername = async (comment, user) => {
//   pool.query(
//     'SELECT * FROM comments INNER JOIN users on ? = ? WHERE user.username = ?',
//     [comment.user_id, user.id, user.username],
//     (err, commentsByUsername) => {
//       if (err) {
//         return reject(err);
//       }
//       console.log('All comments from a particular user' + commentsByUsername);
//       return resolve(commentsByUsername);
//     }
//   );
// };

Comment.findByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM comments WHERE user_id=?',
      userId,
      (err, comment) => {
        if (err) {
          return reject(err);
        }
        console.log(`User with id no.${userId} wrote: ${comment}`);
        return resolve(comment);
      }
    );
  });
};

Comment.update = async (comment, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE comments SET content=?, image=?, image=?, WHERE id=?`,
      [comment.content, comment.image, id],
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

Comment.updateLikes = async (id, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE comments SET like_user_id = like_user_id || ?, likes = likes + 1 WHERE NOT (like_user_id @> ?) AND id = ?`,
      [userId, id],
      (err, likeComment) => {
        if (err) {
          return reject(err);
        }
        console.log(`Like/dislike given by user Id ${userId}`);
        return resolve(likeComment);
      }
    );
  });
};

module.exports = Comment;
