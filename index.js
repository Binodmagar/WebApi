var express = require('express')
var bodyParser = require('body-parser')

//for image
var multer = require('multer');
var upload = multer({dest: 'images/'})

var swaggerJSDOC = require('swagger-jsdoc')//for showing documentation
var swaggerUI = require('swagger-ui-express')


//config for swagger
var swaggerDefinition= {

	info : {
		title:'BookExpense',
		description:'This is my BookExpense documentation',
		version:'1.0.0'
	},
	securityDefinitions :{
		bearerAuth:{
			type:'apiKey',
			name:'authorization',
			in:'header',
			scheme:'bearer'
		}
	},
	host:'localhost:3004',
	basePath:'/'
}


var swaggerOption = {
	swaggerDefinition,
//to see actual api
    apis:['./index.js']
}

//to fill in swagger-jsdoc or config
var swaggerSpecs = swaggerJSDOC(swaggerOption);


var app = express() 
//to see that we see in route
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

// app.post('/test', upload.single('image'), function(req, res, next){
// 	console.log(req.file);
// 	console.log(req.body);
// })//for image

// var dbConfig = require('./Config/databaseConfig.js')
// console.log(dbConfig.sequelize)

var userModel = require('./Models/userMode.js')
//for register
var userController = require('./Controller/userController.js')
//forlogin
var authController = require('./Controller/AuthController.js')


app.use(bodyParser.urlencoded({extended: true }));



//documenation of register
/**
* @swagger
* /register:
*  post:
*   tags:
*    - tbl_user
*   description: User registration testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique password
*   responses:
*    201:
*     description: registered sucessfully
*    409:
*     description: user already exits
*    500:
*     description: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYmVydCIsInVzZXJMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NzY3MjQxNDIsImV4cCI6MTU3Njc2MDE0Mn0.IxDHZmsvG88ILGxvQU0NhI-E8qlET1sDGQaWWWxnOLsinternal server errors
*/

//for register
app.post('/register',userController.validator, userController.CheckIfUserExit, userController.getHash, userController.actualRegister)//defining route
// console.log(req.body);



/**
* @swagger
* /login:
*  post:
*   tags:
*    - tbl_user
*   description: User login testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide  username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide  password
*   responses:
*    201:
*     description: registered sucessfully
*    406:
*     description: username and password required
*/
//login route
//for login
app.post('/login',authController.validator, authController.passwordChecker, authController.jwtTokenGen)
// console.log(req.body);

/**
* @swagger
* /user/{id}:
*  delete:
*   tags:
*    - tbl_user
*   security:
*    - bearerAuth: []
*   description: User registration testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: id
*      in: path
*      required: true
*      description: Please provide id to delete
*   responses:
*    400:
*     description: Invalid id supplied
*/
//defining route for delete
app.delete('/user/:id',authController.verifyToken, userController.deleteUser)

//defining route for update
app.put('/user/:id', userController.updateUser)

app.listen(3004);