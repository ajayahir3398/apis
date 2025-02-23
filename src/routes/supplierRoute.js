const express = require("express");
const {
  addSupplier,
  getSupplier,
  getSupplierKeyValuePair,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /supplier/add:
 *   post:
 *     summary: Add a new supplier
 *     tags: [Supplier]
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
 *               supplierName:
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
 *         description: Supplier added successfully
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
router.post("/add", verifyToken, addSupplier);

/**
 * @swagger
 * /supplier/getSupplier:
 *   get:
 *     summary: Get a supplier by ID or get all suppliers
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: supplierId
 *         schema:
 *           type: string
 *         description: The ID of the supplier to retrieve
 *     responses:
 *       200:
 *         description: Suppliers fetched successfully
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
 *                   supplierName:
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
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.get("/getSupplier", verifyToken, getSupplier);

/**
 * @swagger
 * /supplier/getSupplierKeyValuePair:
 *   get:
 *     summary: Get supplier key-value pairs for dropdown selection
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Supplier fetched successfully
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
router.get("/getSupplierKeyValuePair", verifyToken, getSupplierKeyValuePair);

/**
 * @swagger
 * /supplier/update/{supplierId}:
 *   put:
 *     summary: Update a supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the supplier to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *               supplierName:
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
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 supplier:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     businessName:
 *                       type: string
 *                     supplierName:
 *                       type: string
 *                     gstNo:
 *                       type: string
 *                     mobileNo:
 *                       type: string
 *                     email:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     dob:
 *                       type: string
 *                     image:
 *                       type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                         street2:
 *                           type: string
 *                         city:
 *                           type: string
 *                         state:
 *                           type: string
 *                         pinCode:
 *                           type: string
 *                         country:
 *                           type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put("/update/:supplierId", verifyToken, updateSupplier);

/**
 * @swagger
 * /supplier/delete/{supplierId}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the supplier to delete
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:supplierId", verifyToken, deleteSupplier);

module.exports = router;
