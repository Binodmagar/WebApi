const Sequelize = require('sequelize');

//passing parameters separately
const sequelize = new Sequelize('webapi', 'root', 'admin', {
	host: 'localhost',
	dialect: //this means database that we are going to use (mysql)
});

sequelize
.authenticate()
//then and catch means promise handler this means sequence of work to be done
//threee state pending, resloved and rejected
// var a = 'ram';
// console.log(a);
.then(() => {
	console.log('Connection success');
})
.catch(function (err){
	console.log(err);
});
//.catch(err => {
	//console.error('unable to connect:', err);
//});