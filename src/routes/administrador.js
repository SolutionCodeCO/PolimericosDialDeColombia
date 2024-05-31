const express = require('express')
const router = express.Router()
const pool = require('../database')


router.get('/administrador', async (req, res) => {
    try {
        const [rows_play] = await pool.query("SELECT COUNT(*) AS cantidad FROM playlists");
        const contador_playlist = rows_play.cantidad;

        const [rows_users] = await pool.query("SELECT COUNT(*) AS cantidad FROM usuarios");
        const contador_usuarios = rows_users.cantidad;

        const [rows_comentarios] = await pool.query("SELECT COUNT(*) AS cantidad FROM testimonios");
        const contador_testimonios = rows_comentarios.cantidad;

        const [rows_contacto] = await pool.query("SELECT COUNT(*) AS cantidad FROM contactos");
        const contador_contactos = rows_contacto.cantidad;


        res.render('admin/index', { contador_playlist, contador_usuarios, contador_testimonios, contador_contactos });
    } catch (error) {
        console.error('Error fetching playlist count:', error);
        res.status(500).send('Error fetching playlist count');
    }
});


router.get('/administrador/testimonios', (req, res)=>{
    res.render('admin/testimonios')
})

router.get('/administrador/usuarios', (req, res)=>{
    res.render('admin/usuarios')
})

router.get('/administrador/contacto', async (req, res)=>{
    const contactos = await pool.query('SELECT * FROM contactos')
    res.render('admin/contacto', {contactos})
})

router.get('/administrador/aprendizaje', async (req, res)=>{
    const playlist = await pool.query('SELECT * FROM playlists')
    res.render('admin/aprendizaje', {playlist})
})

router.post('/form_playlist', async(req, res)=>{
    const { 
        nombre,
        descripcion
    } = req.body

    const newPlaylist = {
        nombre,
        descripcion
    }

    pool.query('INSERT INTO playlists set ?', [newPlaylist])
   
    res.redirect("/administrador/aprendizaje")
})
module.exports = router