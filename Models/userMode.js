var dbConfig = require('../Config/databaseConfig.js')
//defining database or model 
var user = dbConfig.sequelize.define('user',//model name
	//attribute
{
id: {
	type:dbConfig.Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true,
	allowNull: false
},
username:{
	type:dbConfig.Sequelize.TEXT,
	allowNull: false
},
password:{
	type:dbConfig.Sequelize.TEXT,
	allowNull: false
}
},
//third parameter other options
{
paranoid: true,
freezeTableName:true,//this means own table name
tableName: 'tbl_user'
}

)
//acutal create method sink
user.sync({force:false})
.then(function(result){
	console.log(result);
})
.catch(function(err){
	console.log(err);
})


var expense = dbConfig.sequelize.define('expense',//model name
	//attribute
{
id: {
	type:dbConfig.Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true,
	allowNull: false
},
expenseDetails:{
	type:dbConfig.Sequelize.TEXT,
	allowNull: false
},
money:{
	type:dbConfig.Sequelize.TEXT,
	allowNull: false
}
},
//third parameter other options
{
freezeTableName:true,//this means own table name
tableName: 'tbl_expense'
}

)
//acutal create method sink
expense.sync({force:false})
.then(function(result){
	console.log(result);
})
.catch(function(err){
	console.log(err);
})

module.exports = {user,expense}