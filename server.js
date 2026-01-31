require('dotenv').config()
const Express = require('express')
const app = Express()
const mongoose = require('mongoose')
const route = require('./routes')
const cors = require('cors')
const User = require('./models/UserModel')
const session = require('express-session')
const MongoStore = require('connect-mongo').default

app.use(cors({
    origin:process.env.URLFRONT,
    credentials:true
})) //permite se comunicar apenas com a url passada

app.use(Express.json()) //trata JSON antes das  rotas
app.use(Express.urlencoded({extended:true})) //trata o body da requisiçao

mongoose.connect(process.env.URLBANCO).then(() =>{
    try{
        app.emit('pronto')
        console.log('BANCO DE DADOS CONECTADO')
    }catch(err){
        console.log('ERRO AO CONECTAR AO BANCO DE DADOS')
    }
})

app.use(session({ //config para sessoes
    secret: 'nlkandklnaklncklasnklasnfkansfklanflknklanklancklnaklnkanfkanfklnklcanksfnfnscbsfdvavav',
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.URLBANCO,
        ttl: 14 * 24 * 60 * 60 // 14 dias
    }),
    cookie:{
        httpOnly:true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 dias em milissegundos
        sameSite: 'lax', // importante para CORS funcionar corretamente
        secure: false // true apenas em produção com HTTPS
    }
}))

app.use(route)

app.on('pronto',() =>{
    app.listen(process.env.PORT, () => {
        console.log('acesse: http://localhost:3000')
    })
})
