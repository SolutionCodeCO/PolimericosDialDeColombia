const express = require('express')
const router = express.Router()
const pool = require ('../database')


router.get('/', async (req, res)=>{
    const query = `
    SELECT testimonios.*, usuarios.nombre AS usuario_nombre 
    FROM testimonios 
    JOIN usuarios ON testimonios.usuario_id = usuarios.id
`;
const [rows_testimonios] = await pool.query(query);
const testimonios = rows_testimonios;

    res.render('index/index', {testimonios})
})

// CREAR CONTACTOL
router.post('/form-contacto', async(req, res)=>{
    const { 
        nombres_cont,
        apellidos_cont,
        email_cont,
        numero_tlf_cont,
        asunto_cont
    } = req.body

    const newContacto = {
        nombres_cont,
        apellidos_cont,
        email_cont,
        numero_tlf_cont,
        asunto_cont
    }

    try {
        pool.query('INSERT INTO contactos set ?', [newContacto])
        req.flash('success', '¡Contacto enviado con exito!');
    } catch (error) {
        req.flash('error', 'Error al constactarte con Dial');
    }
    res.redirect('/')

})



module.exports = router