const express = require("express");
const { addProduct } = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               availableStock:
 *                 type: number
 *               uom:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: base64
 *     responses:
 *       201:
 *         description: Product added successfully
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
router.post("/add", verifyToken, addProduct);

module.exports = router;
