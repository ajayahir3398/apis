const express = require("express");
const {
  addProduct,
  getProduct,
  getProductKeyValuePair,
} = require("../controllers/productController");
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
 *               quantity:
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

/**
 * @swagger
 * /product/getProduct:
 *   get:
 *     summary: Get a product by ID or get all products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   productName:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *                   uom:
 *                     type: string
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/getProduct", verifyToken, getProduct);

/**
 * @swagger
 * /product/getProductKeyValuePair:
 *   get:
 *     summary: Get product key-value pairs for dropdown selection
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   key:
 *                     type: string
 *                   value:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/getProductKeyValuePair", verifyToken, getProductKeyValuePair);

module.exports = router;
