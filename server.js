require('dotenv').config()

const Express = require('express')
const app = Express()
const mongoose = require('mongoose')
const route = require('./routes')
const cors = require('cors')
const User = require('./models/UserModel')

//trata o body da requisiçao
app.use(Express.urlencoded({extended:true}))

mongoose.connect(process.env.URLBANCO).then(() =>{
    try{
        app.emit('pronto')
        console.log('BANCO DE DADOS CONECTADO')
    }catch(err){
        console.log('ERRO AO CONECTAR AO BANCO DE DADOS')
    }
})

app.use(route)


app.use(Express.json())
app.use(cors())

//funçao teste 
async function run(){
    const user = await User.create({name:'Davi de lucas', age:20})

    const users = await User.find()
    
    console.log(users)
}

run()

app.on('pronto',() =>{
    app.listen(process.env.PORT, () => {
        console.log('acesse: http://localhost:3000')
    })
})
