// //describe means scenario
// case / freature;
// login 

// //asert: written in it
// login fb
// username 
// password

var chai = require('chai')//chai work as assertion and it show where to hit apis or show path of apis
var chaiHttp = require('chai-http')
var apis = require('../index.js')
var should = chai.should();



chai.use(chaiHttp)

describe('user', function(){
	describe('POST request for user registration', function(){
		it('should register a user, must provide unique username', function(done){
			chai.request(apis)
			.post('/register')
			.set('content-type','application/x-www-form-urlencoded')//set header means what type of data is sending in body
			.send({
				username: 'john',
				password: 'john'
			})
			//use of call back: used  when we dont know when it end
			.end(function(err, res){
				// res.expect.status(200)
				res.should.have.status(200);
				done();
			})
		})
		it('should throw user name exit', function(done){
			chai.request(apis)
			.post('/register')
			.set('content-type', 'application/x-www-form-urlencoded')
		})
	})
})
