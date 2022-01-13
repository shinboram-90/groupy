const passwordValidator = "password-validator";
const db = require("./db.js");

// exports.schemaPV = new passwordValidator();

// schemaPV.is().min(8).is().max(35);

const User = function (user) {
  this.nickname = user.nickname;
  this.biography = user.biography;
  this.status = user.status;
};

User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    console.log("created users; ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
