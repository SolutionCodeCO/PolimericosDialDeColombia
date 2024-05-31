const express = require('express')
const router = express.Router()
const pool = require('../database')

// INDEX
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

// TESTIMONIOS
// TRAER TESTIMONIOS
router.get('/administrador/testimonios', async(req, res)=>{
    const testimonios = await pool.query('SELECT * FROM testimonios')
    res.render('admin/testimonios', {testimonios})
})

// ELIMINAR TESTIMONIOS
router.get('/testimonios/:id', (req, res)=>{
    const {id} = req.params
    
    pool.query('DELETE FROM testimonios WHERE id = ?', [id])
    res.redirect("/administrador/testimonios")
})

// USUARIOS
// TRAER USUARIOS
router.get('/administrador/usuarios', async(req, res)=>{
    const usuarios = await pool.query('SELECT * FROM usuarios')
    res.render('admin/usuarios', {usuarios})
})

// ELIMINAR USUARIOS
router.get('/usuarios/:id', (req, res)=>{
    const {id} = req.params
    
    pool.query('DELETE FROM usuarios WHERE id = ?', [id])
    res.redirect("/administrador/usuarios")
})


// CONTACTOS
// TRAER CONTACTOS
router.get('/administrador/contacto', async (req, res)=>{
    const contactos = await pool.query('SELECT * FROM contactos')
    res.render('admin/contacto', {contactos})
})

// ELIMINAR CONTACTOS
router.get('/contacto/:id', (req, res)=>{
    const {id} = req.params
    
    pool.query('DELETE FROM contactos WHERE id = ?', [id])
    res.redirect("/administrador/contacto")
})

// APRENDIZAJE
// TRAER PLAY LIST
router.get('/administrador/aprendizaje', async (req, res)=>{
    const playlist = await pool.query('SELECT * FROM playlists')
    res.render('admin/aprendizaje', {playlist})
})

// ELIMINAR PLAY LIST
router.get('/aprendizaje/:id', (req, res)=>{
    const {id} = req.params
    
    pool.query('DELETE FROM playlists WHERE id = ?', [id])
    res.redirect("/administrador/aprendizaje")
})

// CREAR PLAY LIST
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