import User from '../models/UserModel.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const Login = async (req,res) =>{
    const dados = req.body

    const users = await User.find({email:dados.email})

    if(users.length != 0 ){

        const user = users[0]

        const compSenha = await argon2.verify(user.senha,dados.senha)
        if(!compSenha){ 
            res.json({msgerr:"senha incorreta!"})
        }else{
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '14d' })
            res.json({ msg: 'Login realizado', token })
        }
    }else{
        res.json({msgerr:"email nao encontrado"})
    }
}
