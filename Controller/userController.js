var bcrypt = require('bcrypt');

var userModel = require('../Models/userMode.js')


function validator(req, res, next){
	if(req.body.username === ""){
		res.json({status:404,message:'username is required'})
	}
	else if (req.body.password === ""){
		res.json({status:404, message:'Password is required'})
	}
	else{
		console.log(req.body)
		// res.json({status:200, message:'success'})
		next();
	}
}


function CheckIfUserExit(req, res, next){
	//db --> username user exits 
	//find one is a function
	userModel.user.findOne({
		where:{username:req.body.username}
	})
	.then(function(result){
		console.log(result)
		if(result === null){
			next();
		}else{
			res.json({status:409, message:"user already exits"})
		}
		
	})
	.catch(function(err){
		console.log(err)
		res.json(err)
	})
}


//to hash password
function getHash(req, res, next){
	var saltRounds = 5;//this means how much we need to encrypt 
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

		if(hash){
			console.log(hash)
			req.hashKey = hash;
			next();
			// res.json(hash)

		}else if(err){
			res.json({status:500, message: "couldnot hash password"})
		}
	
});

}


//insert into database function
function actualRegister(req, res, next){
	//take parameters as object by user.create
	userModel.user.create({
		username:req.body.username,
		password:req.hashKey
	})
	.then(function(result){
		console.log(result)
		res.json(result);
		res.json({status:201, message: "success"})
	})
	.catch(function(err){
		console.log(err)
		res.json(err);
	})
}

function deleteUser(req, res, next){

	if(req.params.id === null || req.params.id === undefined){
		res.status(404);
		res.json({status:404, message: "id not provide"})
	}
	// req.params.id
	userModel.user.destroy({
		where: {
			id:req.params.id
		}
	})
	.then(function(result){
		console.log(result)
		if(result === 0){
			res.status(500);
			res.json({status:500, message: "couldnot delete"})
		}else{
			res.status(200);
			res.json({status:200, message: "delete success"})
		}
	})
	.catch(function(err){
		console.log(err)
	})
}

// function imageUpload()

module.exports = {validator, getHash, CheckIfUserExit, actualRegister, deleteUser}