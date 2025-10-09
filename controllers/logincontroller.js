import User from "../models/UserModel.js"
import argon2 from 'argon2'

export const novosDados = async (req,res) =>{
    const {nome, email,senha} = req.body
    console.log(nome, email , senha)

    try{
        
        const SenhaHash = await argon2.hash(senha) //envia a senha criptografada para o BD

        const user = await User.create({name:nome, email:email, senha:SenhaHash}) //salva dados no banco de dados
        
        const users = await User.find()
        console.log('Usuarios ate agora:',users)

        res.json({msg:"usuario salvo com sucesso"})
    }catch(err){
        console.log(err)
    }
}