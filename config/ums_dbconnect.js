const mysql      = require('mysql');
var connection = mysql.createConnection(ums);
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
module.exports = connection;