const express = require('express')
const router = express.Router()
const pool = require('../database')


router.get('/cursos', async (req, res)=>{
    const playlist = await pool.query('SELECT * FROM playlists')
    res.render('aprendizaje/cursos', {playlist})
})

module.exports = router