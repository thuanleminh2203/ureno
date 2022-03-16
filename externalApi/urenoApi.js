const fetch = require('node-fetch')
const crypto = require('crypto')
const { URENO_GET_CUSTOMER,URENO_GET_INVOICE,URENO_PAYMENT } = require('../constant/AppConstant')
require('dotenv').config()


function genarateHeaders(functionName,check_sum){
    const headers = {
        'Content-Type': 'application/json',
        'function': functionName,
        'check_sum': check_sum,
        'partner': process.env.PARTNER,
        'sign_type':'SHA256',
        'encoding': 'UTF-8',

    }
    return headers
}

function genarateCheckSum(dataContent = {}, functionName = ''){
    const dataSign = process.env.URENO_PRIVATE_KEY + '|' + process.env.PARTNER+ '|'+ functionName + '|' + JSON.stringify(dataContent)

    const sha256 = crypto.createHmac("sha256", process.env.URENO_PRIVATE_KEY).update(dataSign, "utf-8")
    return sha256.digest("hex")

}
//===api===

async function getCustomerInfo(body = {}){
    try{

        const response = await fetch( `${process.env.UNERO_API}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: genarateHeaders(URENO_GET_CUSTOMER,genarateCheckSum(body,URENO_GET_CUSTOMER))
        })
    
        const data = await response.json()
        if(data && data.ErrorCode !== 0){
            return null
        }
        return data && data.ErrorCode !== 0 ? null : data.Data

    }catch(err){
        console.log('===err when call getInvoice ===', err)
        throw err
    }

}
async function getInvoice(body = {}){
    try{

        const response = await fetch( `${process.env.UNERO_API}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: genarateHeaders(URENO_GET_INVOICE,genarateCheckSum(body,URENO_GET_INVOICE))
        })
    
        const data = await response.json()
        return data.Data
        // console.log('====data===', data)
    }catch(err){
        console.log('===err when call getInvoice ===', err)
        throw err
    }

}

async function payment(){
    try{
        const body = {CustomerCode: 'HDO0009754'}
        const response = await fetch( `${process.env.UNERO_API}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: genarateHeaders(URENO_PAYMENT,genarateCheckSum(body,URENO_PAYMENT))

        })
    
        const data = await response.json()

        console.log('====data===', data)
    }catch(err){
        console.log('===err when call Payment ===', err)
    }

}


module.exports = {getInvoice,payment,getCustomerInfo}