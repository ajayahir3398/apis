const express = require("express");
const {
  getLoginForm,
  generateToken,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getLoginForm);
router.post("/", generateToken);

module.exports = router;
