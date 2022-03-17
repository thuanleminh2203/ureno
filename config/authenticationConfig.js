const expressJwt = require('express-jwt')
require('dotenv').config()
const userService = require('../service/userService')

module.exports = jwt;

function jwt() {
    const secret = process.env.TOKEN_SECRECT

    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/oauth/register',
            '/oauth/login',
            /^\/api-docs\/.*/
        ]
    });
}

async function isRevoked(req, payload, done) {
    // // revoke token if user no longer exists
    if (!payload) {
        return done(null, true);
    }

    req.userInfo = {
        cif: payload.cif,
        fullname: payload.fullname,
        mobile: payload.mobile,
    }

    done();
}
