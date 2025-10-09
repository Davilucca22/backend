const express = require('express')

const router = express.Router()

const home = require('./controllers/homecontroller')
const login = require('./controllers/logincontroller')

router.get('/', home.olaMundo)

router.post('/login', login.novosDados)

module.exports = router
