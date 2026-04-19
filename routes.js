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
const userFeed = require('./controllers/feedPostsUSercontroller')
const PerfilAlheio = require('./controllers/perfilOutroscontroller')
const seguir = require('./controllers/seguircontroller')
const desSegue = require('./controllers/deixardeseguircontroller')
const buscar = require('./controllers/buscaUsercontroller')
const DeletaFoto = require('./controllers/deletaFoto')
const { verifyToken } = require('./middlewares/authMiddleware')
 
const upload = multer({storage:multer.memoryStorage()})

router.get('/', home.olaMundo) //nao faz nada mas se tirar o servidor quebra

router.post('/register',upload.single("foto") ,registro.cadastro)

router.post('/login',login.Login)

router.get('/session', verifyToken, sessao.Sessao) // lida apenas com a sessao

router.get('/feed', verifyToken, feed.Feed)

router.put('/curtida', verifyToken, curtir.attcurtida)

router.get('/perfil', verifyToken, perfil.Perfil)

router.put('/postar', verifyToken, upload.single("img"), publicar.Postar)

router.put('/comentario', verifyToken, comentarios.comentario)

router.put('/attdados', verifyToken, atualizaDados.attdados)

router.put('/editperfil', verifyToken, upload.single("novafoto"), editperfil.EditPerfil)

router.put('/editinfo', verifyToken, editinfo.EditaInfo)

router.put('/editsenha', verifyToken, editsenha.EditSenha)

router.get('/feedUser/:id', verifyToken, userFeed.feedUser)

router.get('/perfiloutro/:id', verifyToken, PerfilAlheio.PerfilOutro)

router.put('/Seguir', verifyToken, seguir.Seguir)

router.put('/deixarDeSeguir', verifyToken, desSegue.DeixaSeguir)

router.get('/buscar', verifyToken, buscar.Busca)

router.delete('/Delete', verifyToken, DeletaFoto.DeletaFoto)

module.exports = router

//GET - pega
//POST - cria
//PUT - Atualiza
//DELETE - deleta
