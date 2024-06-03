const mysql = require('mysql2/promise');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection()
  .then(connection => {
    console.log(">>> CONECTADO A LA BD");
    connection.release();
  })
  .catch(error => {
    console.error(">>> Error al conectar a la BD:", error.message);
  });

module.exports = pool;
