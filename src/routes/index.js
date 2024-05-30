const express = require('express')
const router = express.Router()
const pool = require ('../database')


router.get('/', (req, res)=>{
    res.render('index/index')
})

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

    pool.query('INSERT INTO contactos set ?', [newContacto])
   
    res.send("enviado al admini")
})
module.exports = router