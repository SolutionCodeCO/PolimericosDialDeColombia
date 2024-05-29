const express = require('express')
const router = express.Router()
const pool = require('../database')


router.get('/administrador', (req, res)=>{
    res.render('admin/index')
})

router.get('/administrador/testimonios', (req, res)=>{
    res.render('admin/testimonios')
})

router.get('/administrador/usuarios', (req, res)=>{
    res.render('admin/usuarios')
})

router.get('/administrador/contacto', (req, res)=>{
    res.render('admin/contacto')
})

module.exports = router