const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

const userSchema = new mongoose.Schema({
    id: ObjectId,
    cif: String,
    fullname: String,
    dob: String,
    idCardNo:String,
    mobile:String,
    email:String

})

mongoose.model('user', userSchema) 