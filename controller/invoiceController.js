const express = require('express')
const { getAll } = require('../service/invoiceService')
require('dotenv').config()
const router = express.Router()


router.get('/:customerCode', (req,res,next) => {
    
    getAll(req.params.customerCode)
    .then(data => res.json(data))
    .catch((err) => next(err))
})

module.exports = router