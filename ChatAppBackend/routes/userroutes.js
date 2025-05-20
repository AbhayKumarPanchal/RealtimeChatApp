const express = require("express");
const { register, login, logout } = require("../controllers/usercontroller.js");

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout/:id').delete(logout);

module.exports = router;
