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
