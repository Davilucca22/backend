import User from '../models/UserModel.js'
import argon2 from 'argon2'
import session from 'express-session'

export const Login = async (req,res) =>{
    const dados = req.body

    const users = await User.find({email:dados.email})

    if(users.length != 0 ){

        const user = users[0]

        const compSenha = await argon2.verify(user.senha,dados.senha) //users.senha vem undefined
        if(!compSenha){ 
            res.json({msgerr:"senha incorreta!"})
        }else{
            req.session.user = user._id.toString() //passa apenas o ID do usuario na sessao
            res.json({msg:'Login realizado'})
        }
    }else{
        res.json({msgerr:"email nao encontrado"})
    }
}
