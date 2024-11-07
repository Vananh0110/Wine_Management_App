const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '011002',
    database: 'wine_management_db'
  });

module.exports = connection;