const mysql = require('mysql2')

let = defaultConfig

if (process.env.JAWSDB_URL){
  defaultConfig = process.env.JAWSDB_URL
}
else {
  defaultConfig = {
    host: 'localhost',
    user: 'root',
    password: 'sum182magodeoz',
    database: 'burgers_db'
  }
}

module.exports = mysql.createConnection(defaultConfig).promise()

