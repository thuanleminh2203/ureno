const express = require('express')
require('dotenv').config()
const router = express.Router()
const oauthService = require('../service/oauthService')
const validateRequestSchema = require('../middleware/validateRequestSchema')
const loginSchema = require('../schema/loginSchema')
const crypto = require('crypto')
const { getInvoice } = require('../externalApi/urenoApi')


router.post('/login', validateRequestSchema(loginSchema) , (req,res,next) => {
    const { body } = req

    oauthService.login(body)
    .then(token => res.json(token))
    .catch((err) => next(err))
})

module.exports = router