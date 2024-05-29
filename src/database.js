const mysql = require ('mysql2')
const {promisify }= require ('util')
const {database} =require('./keys')

const pool = mysql.createPool(database)

pool.getConnection((err,connection)=>{
    if(err){
        console.log(">>> ERROR AL CONECTARSE: ", err);
    }
    if(connection) connection.release()
    console.log(">>>> CONECTADO A LA BASE DE DATOS :D");
return
})

pool.query = promisify(pool.query)
module.exports = pool