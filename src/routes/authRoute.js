const express = require("express");
const { login, register } = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               name:
 *                 type: string
 *               gstNo:
 *                 type: string
 *               mobileNo:
 *                 type: string
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *               street:
 *                 type: string
 *               street2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pinCode:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/register", register);

module.exports = router;
