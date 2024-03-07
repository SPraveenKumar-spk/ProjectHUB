const express = require("express");
const router = express.Router();

const {home,register,login,createprojects,viewprojects} = require("../controllers/auth-controller");
router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/createprojects").post(createprojects);
router.route("/viewprojects").get(viewprojects);
module.exports = router;