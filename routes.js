const express = require('express')
const multer = require('multer')
const router = express.Router()

const home = require('./controllers/homecontroller')
const registro = require('./controllers/registrocontroller')
const upload = multer({storage:multer.memoryStorage()})

router.get('/', home.olaMundo)

router.post('/register',upload.single("foto") ,registro.cadastro)

module.exports = router
