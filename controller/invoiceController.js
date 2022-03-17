const express = require('express')
const { getAll } = require('../service/invoiceService')
require('dotenv').config()
const router = express.Router()

/**
 * @swagger
 * /invoice/{customerCode}:
 *   get:
 *     summary: Get all invoice by customerCode
 *     tags: [INVOICE]
 *     parameters:
 *       - in: path
 *         name: customerCode
 *         schema:
 *           type: string
 *         required: true
 *         description: customerCode
 *     responses:
 *       200:
 *         description: All invoice
 */
router.get('/:customerCode', (req,res,next) => {
    const customerCode = req.params.customerCode
    // if(customerCode.length )
    getAll(customerCode)
    .then(data => res.json(data))
    .catch((err) => next(err))
})

module.exports = router