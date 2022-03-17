const express = require('express')
const errorHandler = require('./config/errorHandler')
const cors = require('cors')
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
require('./config/dbConfig')
const port = 3000
const app = express()
const jwt = require('./config/authenticationConfig')
app.use(express.json())

app.use(cors())

app.use(jwt())

const swaggerDefinition = {
	info: {
	  title: 'UrenoMiniApp Swagger API',
	  version: '1.0.0',
	  description: 'Endpoints to test the user registration routes',
	},
	host: 'localhost:3000',
	basePath: '/',
	securityDefinitions: {
	  bearerAuth: {
		type: 'apiKey',
		name: 'Authorization',
		scheme: 'Bearer',
		in: 'header',
	  },
	},
	security: [ { bearerAuth: [] } ],
  };

const options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
      },
	swaggerDefinition,
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
		security: [ { bearerAuth: [] } ],
	},
	apis: ["./controller/*.js"],

}

const specs = swaggerJsDoc(options)
if(process.env.NODE_ENV === "production"){
	app.use("/api-docs",(req,res,next) => {
		res.status(404).json({ error: "Not Found", status: 404, message: 'Not Found' })
	})
}else{
	app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
}

const oauthController = require('./controller/oauthController')
const userController = require('./controller/userController')
const invoiceController = require('./controller/invoiceController')

app.use('/oauth', oauthController)
app.use('/user', userController)
app.use('/invoice', invoiceController)


app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}`))