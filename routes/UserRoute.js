const router = require("express").Router();
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AdminMiddleware = require("../middlewares/AdminMiddleware");
const UserController = require("../controllers/UserController");
router.get("/", UserController.getUsers);
router.post("/", UserController.createUser);
router.delete(
  "/",
  [AuthMiddleware, AdminMiddleware],
  UserController.deleteUsers
);
router.get("/profile", [AuthMiddleware], UserController.profileUser);

module.exports = router;
