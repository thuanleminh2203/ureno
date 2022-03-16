const mongoose = require('mongoose')
const User = mongoose.model('user')

async function getAll(){
    return await User.find()
}

async function getByUsername(username){
    return await User.findOne({username: new RegExp('^'+username+'$', "i")})
}

module.exports = {
    getAll,
    getByUsername
}