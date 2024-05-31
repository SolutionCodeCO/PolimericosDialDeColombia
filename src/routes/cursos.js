const express = require('express')
const router = express.Router()
const pool = require('../database')


router.get('/cursos', async (req, res)=>{
    const playlist = await pool.query('SELECT * FROM playlists')
    const [rows_cursos] = await pool.query("SELECT COUNT(*) AS cantidad FROM cursos");
    const contador_cursos = rows_cursos.cantidad;

    
    res.render('aprendizaje/cursos', {playlist, contador_cursos})
})

module.exports = router