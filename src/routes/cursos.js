const express = require('express')
const router = express.Router()


router.get('/cursos', (req, res)=>{
    res.render('aprendizaje/cursos')
})

module.exports = router