var Sequelize = require('sequelize');
//help to write javascript code: object relation mapping(ORM)
//passing parameters separately
var sequelize = new Sequelize('webapi', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql',//this means database that we are going to use (mysql)
	logging: false
});


sequelize.authenticate()//method of connection
//then and catch means promise handler this means sequence of work to be done
//threee state pending, resloved and rejected
.then(function(result){
	console.log('db success')
})

.catch(function (err){//this means function of error and same as down below
	console.log(err);
})
// .then(() => {
// 	console.log('Connection success');
// })
// // .catch(err => {
// // 	console.error('unable to connect:', err);
// // });

module.exports = {
	sequelize,
	Sequelize
}