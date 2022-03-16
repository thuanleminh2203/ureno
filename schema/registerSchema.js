const {body} = require('express-validator')

const registerSchema = [
    body('username')
        .not().isEmpty().withMessage('username is required!'),
    body('username')
        .isLength({ min: 6 , max : 255 }).withMessage('username must be greater than 6 character and less than 255 !'),
    body('password')
        .not().isEmpty().withMessage('password is required!'),
    body('password')
        .isLength({ min: 6 , max : 255 }).withMessage('password must be greater than 6 character and less than 255 !')

]
module.exports = registerSchema

