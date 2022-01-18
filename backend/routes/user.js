const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCtrl = require("../controllers/user");

// router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);

router.get("/", userCtrl.getAllUsers);
// router.get("/:id", auth, userCtrl.getOneUser);

// router.put("/:id", auth, multer, userCtrl.modifyUser);
// router.delete("/:id", auth, userCtrl.deleteUser);

// router.put("/:id/admin", auth, multer, userCtrl.modifyOneUserAdmin);
// router.put("/admin", auth, multer, userCtrl.modifyAllUsersAdmin);

module.exports = router;
