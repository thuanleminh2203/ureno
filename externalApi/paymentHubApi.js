const fetch = require('node-fetch')

require('dotenv').config()

const headers = {'Content-Type': 'application/json','MERCHANT_CODE':process.env.MERCHANT_CODE,'MERCHANT_SECRET':process.env.MERCHANT_SECRET}

async function verify(body){
    try{
        // const body = {token: 'MBMAHNGVjYWQ4ZTQtYThhYi00MzNhLWE5ZmUtZmQyZjFmYTBjNGVh'}
        const response = await fetch( `${process.env.PAYMENTHUB_API}/merchant/v1/session/verify`, {
            method: 'post',
            body: JSON.stringify(body),
            headers
        })
    
        const data = await response.json()
    
        console.log('====data===', data)

        return {
            cif: data.cif,
            fullname: data.fullname,
            mobile: data.mobile,
            dob: data.dob,
            idCardNo: data.idCardNo,
            email: data.email
        }
    }catch(err){
        console.log('===err when call paymentHub verify===', err)
    }

}

async function initTransaction(){
    const body = {
        cif: '123123',
        amount: 100000,
        description: ''
    }
    try{
        const response = await fetch(`${process.env.PAYMENTHUB_API}/merchant/v1/transaction`, {
            method: 'post',
            body: JSON.stringify(body),
            headers
        })
    
        const data = await response.json()

        console.log('====data===', data)
    }catch(err){
        console.log('===err when call initTransaction verify===', err)
    }

}


module.exports = {verify,initTransaction}