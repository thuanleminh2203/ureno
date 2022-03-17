const express = require('express')
require('dotenv').config()
const router = express.Router()
const oauthService = require('../service/oauthService')
const validateRequestSchema = require('../middleware/validateRequestSchema')
const loginSchema = require('../schema/loginSchema')
const crypto = require('crypto')
const { getInvoice } = require('../externalApi/urenoApi')


/**
 * @swagger
 * /oauth/login:
 *   post:
 *     summary: login
 *     tags: [Oauth]
 *     parameters:
 *       - in: body
 *         name: login
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *             token:
 *               type: string
 *               require: true
 *     responses:
 *       200:
 *         description: token login
 */
router.post('/login', validateRequestSchema(loginSchema) , (req,res,next) => {
    const { body } = req

    oauthService.login(body)
    .then(token => res.json(token))
    .catch((err) => next(err))
})

module.exports = router