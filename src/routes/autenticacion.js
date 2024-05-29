const express = require('express')
const router = express.Router()


router.get('/autenticacion', (req, res)=>{
    res.send('login')
})

module.exports = router