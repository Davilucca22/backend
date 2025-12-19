const express = require('express')
const multer = require('multer')
const router = express.Router()

const home = require('./controllers/homecontroller')
const registro = require('./controllers/registrocontroller')
const feed = require('./controllers/feedcontroller')
const login = require('./controllers/logincontroller')
const perfil = require('./controllers/perfilController')
const publicar = require('./controllers/postaFTcontroller')

const upload = multer({storage:multer.memoryStorage()})

router.get('/', home.olaMundo)

router.post('/register',upload.single("foto") ,registro.cadastro)

router.post('/login',login.Login)

router.get('/feed',feed.Feed)

router.get('/perfil',perfil.Perfil)

router.put('/postar',publicar.Postar)

module.exports = router


//PUT - Atualiza
