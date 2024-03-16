const mysql = require('mysql2')
const {promisify} = require('util')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'management',
    port:3306,
    password:'Ankita@489',
});
const query = promisify(connection.query).bind(connection)
module.exports = {query};