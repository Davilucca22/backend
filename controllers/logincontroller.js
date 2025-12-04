import User from '../models/UserModel.js'
import argon2 from 'argon2'
import session from 'express-session'

export const Login = async (req,res) =>{
    const dados = req.body

    const users = await User.find({email:dados.email})

    if(users){

        const compSenha = await argon2.verify(users[0].senha,dados.senha) //users.senha vem undefined
        if(!compSenha){ 
            res.json({msgerr:"senha incorreta!"})
        }else{
            res.json({msg:'Login realizado'})
            req.session.user = { email: users[0].email}
        }
    }else{
        res.json({msgerr:"email nao encontrado"})
    }
}
