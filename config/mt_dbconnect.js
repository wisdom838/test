const mysql      = require('mysql');
var MTdb = function () {};
MTdb.prototype.mtdbconnection = function (req,res,data,callback) {
	// console.log(mt)
	var connection = mysql.createConnection(mt);
	connection.connect(function(err) {
		if (err) {
			callback(err,{},req,res,data);
		}else {	
			console.log('You are now connected with mysql MT database...');
			callback({},connection,req,res,data);
		}
	});
};
exports.MTdb = new MTdb();