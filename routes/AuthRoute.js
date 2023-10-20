const router = require("express").Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
// STOP now
router.post("/logout", AuthController.logout);

module.exports = router;
