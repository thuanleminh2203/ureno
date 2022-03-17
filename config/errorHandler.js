module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log('===err.name===',err.code);

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ error: "Bad Request", status: 400,  message: err })
    }

    if (err.name === 'ValidationError' ) {
        // mongoose validation error
        return res.status(400).json({ error: "Bad Request", status: 400, message: err.message })
    }
    if ( err.name === 'BadRequestException') {
        // mongoose validation error
        return res.status(400).json({ error: "Bad Request", status: err.code, message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ error: "Unauthorized", status: 401, message: 'Unauthorized' })
    }
    // console.log('===err.name===',err.name);
    // default to 500 server error
    return res.status(500).json({ error: "Internal Server Error", status: 500, message: err.message })
}