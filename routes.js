const express = require('express')
const multer = require('multer')
const router = express.Router()

const home = require('./controllers/homecontroller')
const login = require('./controllers/logincontroller')
const upload = multer({storage:multer.memoryStorage()})

router.get('/', home.olaMundo)

router.post('/login',upload.single("foto") ,login.cadastro)

module.exports = router
