const express = require("express");
const {
  addCustomer,
  getCustomer,
  getCustomerKeyValuePair,
  getAllCustomers,
} = require("../controllers/customerController");
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

/**
 * @swagger
 * /customer/getCustomer:
 *   get:
 *     summary: Get a customer by ID or get all customers
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         description: The ID of the customer to retrieve
 *     responses:
 *       200:
 *         description: Customers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   businessName:
 *                     type: string
 *                   customerName:
 *                     type: string
 *                   gstNo:
 *                     type: string
 *                   mobileNo:
 *                     type: string
 *                   email:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   dob:
 *                     type: string
 *                   image:
 *                     type: string
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       street2:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       pinCode:
 *                         type: string
 *                       country:
 *                         type: string
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get("/getCustomer", verifyToken, getCustomer);

/**
 * @swagger
 * /customer/getCustomerKeyValuePair:
 *   get:
 *     summary: Get customer key-value pairs for dropdown selection
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer fetched successfully
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
router.get("/getCustomerKeyValuePair", verifyToken, getCustomerKeyValuePair);

module.exports = router;
