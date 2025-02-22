const express = require("express");
const { getUoMKeyValuePair } = require("../controllers/uomController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /uom/getKeyValuePair:
 *   get:
 *     summary: Get UoM key-value pairs for dropdown selection
 *     tags: [UoM]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: UoM data fetched successfully
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
router.get("/getKeyValuePair", verifyToken, getUoMKeyValuePair);

module.exports = router;
