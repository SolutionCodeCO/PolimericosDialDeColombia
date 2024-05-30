const express = require('express')
const router = express.Router()


router.get('/usuario', (req, res)=>{
    res.render('user/usuario')
})

router.get('/usuario/testimonio-user', (req, res)=>{
    res.render('user/testimonio-user')
})

router.get('/usuario/contacto-user', (req, res)=>{
    res.render('user/contacto-user')
})
module.exports = router