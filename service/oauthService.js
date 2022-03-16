const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { verify } = require('../externalApi/paymentHubApi')
const User = mongoose.model('user')

async function create( req ){
    const { username, password } = req

    if( await User.findOne({username: new RegExp('^'+username+'$', "i")}))
      throw 'Username ' + username + ' is already taken!'

      const user = new User({
          username,
          password: bcrypt.hashSync(password),
          roles: ['ADMIN']
      })
    
      await user.save()
}

async function login(req){
    const currentUser = await verify(req)
    let user = await User.findOne({cif: currentUser.cif})
    console.log('===user===',currentUser);
    if(!user){
        user = new User({
            cif: currentUser.cif,
            fullname: currentUser.fullname,
            dob: currentUser.dob,
            idCardNo:currentUser.idCardNo,
            mobile:currentUser.mobile,
            email:currentUser.email

        })

        user.save()
    }
    return genarateToken(currentUser)

}

function genarateToken(user){
    return jwt.sign(user, process.env.TOKEN_SECRECT, {expiresIn: '5000s'})
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRECT)
}

module.exports = {
    create,
    login
}