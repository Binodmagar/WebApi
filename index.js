var express = require('express')
var bodyParser = require('body-parser')

//for image
var multer = require('multer');
var upload = multer({dest: 'images/'})

var app = express() 

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


//for register
app.post('/register',userController.validator, userController.CheckIfUserExit, userController.getHash, userController.actualRegister)//defining route
// console.log(req.body);

//for login
app.post('/login',authController.validator, authController.passwordChecker, authController.jwtTokenGen)
// console.log(req.body);

app.delete('/user/:id',authController.verifyToken, userController.deleteUser)

app.listen(3003);