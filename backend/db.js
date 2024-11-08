const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "166102",
    database: "wine_management_db",
  })
  .promise();

module.exports = connection;
