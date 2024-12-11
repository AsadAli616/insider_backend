const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const squilpool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database:'e_comerce',
  password: "123456"
 
});
module.exports = squilpool