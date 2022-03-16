const {body} = require('express-validator')

const loginSchema = [
    body('token')
        .not().isEmpty().withMessage('token is required!'),
    body('token')
        .isLength({ min: 6 , max : 255 }).withMessage('token must be greater than 6 character and less than 255 !')

]
module.exports = loginSchema

