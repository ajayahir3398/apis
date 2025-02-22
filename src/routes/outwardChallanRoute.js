const express = require("express");
const {
  addOutwardChallan,
} = require("../controllers/outwardChallanController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /outward-challan/add:
 *   post:
 *     summary: Add a new outward challan
 *     tags: [OutwardChallan]
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
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Outward challan added successfully
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
router.post("/add", verifyToken, addOutwardChallan);

module.exports = router;
