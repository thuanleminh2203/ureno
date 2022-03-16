const {validationResult} = require('express-validator')

// function validateRequestSchema(req,res,next){
//     const errors = validationResult(req)

//     if(!errors.isEmpty())
//         return res.status(400).json({errors : errors.array()})
    
//     next()
// }

// parallel processing
const validateRequestSchema = validates => {

    return async (req,res,next) => {
       await Promise.all(validates.map(valid => valid.run(req)))

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }
        return res.status(400).json({ error: "Bad Request", status: 400, validateMessage: errors.array() })


    }
}

// sequential processing
// const validateRequestSchema = validates => {

//     return async (req,res,next) => {
//         for ( let valid of validates){
//             const result = await valid.run(req)
//             if(result.errors.length)
//                 break
//         }

//         const errors = validationResult(req)

//         if (errors.isEmpty()) {
//             return next()
//         }

//         return res.status(400).json({errors : errors.array()})

//     }
// }

module.exports = validateRequestSchema
