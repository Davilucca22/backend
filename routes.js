const express = require('express')
const multer = require('multer')
const router = express.Router()

const home = require('./controllers/homecontroller')
const registro = require('./controllers/registrocontroller')
const feed = require('./controllers/feedcontroller')
const login = require('./controllers/logincontroller')
const perfil = require('./controllers/perfilController')
const publicar = require('./controllers/postaFTcontroller')
const sessao = require('./controllers/sessaocontroller')
const curtir = require('./controllers/cutircontroller')
const comentarios = require('./controllers/comentariocontroller')
const atualizaDados = require('./controllers/attdadoscontroller')
const editperfil = require('./controllers/editusercontroller')
const editinfo = require('./controllers/editInfocontroller')
const editsenha = require('./controllers/editsenhacontroller')
 
const upload = multer({storage:multer.memoryStorage()})

router.get('/', home.olaMundo)

router.post('/register',upload.single("foto") ,registro.cadastro)

router.post('/login',login.Login)

router.get('/session',sessao.Sessao) // lida apenas com a sessao

router.get('/feed',feed.Feed)

router.put('/:id/curtida',curtir.attcurtida)

router.get('/perfil',perfil.Perfil)

router.put('/postar',upload.single("img"), publicar.Postar)

router.put('/comentario',comentarios.comentario)

router.put('/attdados',atualizaDados.attdados)

router.put('/editperfil',upload.single("novafoto"),editperfil.EditPerfil)

router.put('/editinfo',editinfo.EditaInfo)

router.put('/editsenha',editsenha.EditSenha)

module.exports = router

//GET - pega
//POST - cria
//PUT - Atualiza
//DELETE - deleta
