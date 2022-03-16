const express = require('express')
const router = express.Router()
const userService = require('../service/userService')
// var guard = require('express-jwt-permissions')()
const authorization = require('../middleware/authorization')

router.get('/:customerCode', authorization(),(req,res,next) => {
    console.log('==customerCode==',req.params.customerCode)
    userService.getAll()
    .then((users) => res.json(users))
    .catch(err => next(err))
})



module.exports = router