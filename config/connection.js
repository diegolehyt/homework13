// =============================\ Connection /=========================== \\
// MySQL npm to be able to connect the database with our project
const mysql = require('mysql2')

let defaultConfig

// JAWS creates the access to our database inside Heroku
if (process.env.JAWSDB_URL){
  defaultConfig = process.env.JAWSDB_URL
}

// Configuration to use the server with localhost
else {
  defaultConfig = {
    host: 'localhost',
    user: 'root',
    password: '', //======= add your Password here!
    database: 'burgers_db'
  }
}

module.exports = mysql.createConnection(defaultConfig).promise()

