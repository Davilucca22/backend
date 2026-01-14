import User from "../models/UserModel.js";
import session from "express-session";
import { verify, hash } from "argon2";
import { Sessao } from "./sessaocontroller.js";

export const EditSenha = async (req,res) =>{
    try{
        const sessao = req.session.user
        const {senhaAtual, senhaNova} = req.body

        const users = await User.findById(sessao)

        if(users){

            const compSenha = await verify(users.senha,senhaAtual)
            if(!compSenha){
                res.json({erro:"senha atual incorreta!"})
            }else{

                const senhaHash = await hash(senhaNova) // criptografa a nova senha

                const novoLogin = await User.findByIdAndUpdate(sessao,{senha:senhaHash})
                res.json({msg:"senha alterada!"})
            }

        }else{
            res.json({erro:"usuario nao encontrado"})
            return
        }

    }catch(e){
        res.json({erro:e})
    }
}
