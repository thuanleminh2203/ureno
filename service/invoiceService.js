const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { verify } = require('../externalApi/paymentHubApi')
const { getInvoice, getCustomerInfo } = require('../externalApi/urenoApi')
const User = mongoose.model('user')
const BadRequestException = require('../exception/BadRequestException')

async function getAll( customerCode ){
    const customer = await getCustomerInfo({CustomerCode: customerCode})
    console.log('===customer===',customer)
    if(!customer){
        throw new BadRequestException('Tai khoan khong chinh xac')
    }
    const data = await getInvoice({CustomerCode: customerCode})
    return data
}

module.exports = {
    getAll
}