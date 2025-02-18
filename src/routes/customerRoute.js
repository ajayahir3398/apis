const express = require("express");
const { addCustomer } = require("../controllers/customerController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /customer/add:
 *   post:
 *     summary: Add a new customer
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               customerName:
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
 *               image:
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
 *     responses:
 *       201:
 *         description: Customer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/add", verifyToken, addCustomer);

module.exports = router;
