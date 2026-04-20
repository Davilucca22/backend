require('dotenv').config()
const Express = require('express')
const app = Express()
const mongoose = require('mongoose')
const route = require('./routes')
const cors = require('cors')

app.use(cors({
    origin: process.env.URLFRONT
}))

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

app.use(route)

app.on('pronto',() =>{
    app.listen(process.env.PORT, () => {
        console.log('acesse: http://localhost:3000')
    })
})
