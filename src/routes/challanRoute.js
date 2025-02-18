const express = require("express");
const { addChallan } = require("../controllers/challanController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /challan/add:
 *   post:
 *     summary: Add a new challan
 *     tags: [Challan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               vehicleNo:
 *                 type: string
 *               driverName:
 *                 type: string
 *               driverMoNo:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Challan added successfully
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
router.post("/add", verifyToken, addChallan);

module.exports = router;
