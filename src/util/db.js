const mysql=require('mysql2')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'my$ql$erver2k25',
    database:'node_db',
    port:'3306'
})
module.exports=db;