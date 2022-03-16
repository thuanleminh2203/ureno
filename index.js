const express = require('express')
const errorHandler = require('./config/errorHandler')
const cors = require('cors')

require('./config/dbConfig')
const port = 3000
const app = express()
const jwt = require('./config/authenticationConfig')
app.use(express.json())

app.use(cors())

app.use(jwt())

const oauthController = require('./controller/oauthController')
const userController = require('./controller/userController')
const invoiceController = require('./controller/invoiceController')

app.use('/oauth', oauthController)
app.use('/user', userController)
app.use('/invoice', invoiceController)


app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}`))