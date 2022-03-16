const authorization = ( roles = []) => {

    return (req, res, next ) => {
        const { userInfo } = req
        const { cif } = userInfo

        // const check = (element) => roles.includes(element)
        if(cif){
            next()
        }else{
            res.status(403).json({ error: "Forbiden", status: 403, message: 'Forbiden' })
        }
    }
}

module.exports = authorization