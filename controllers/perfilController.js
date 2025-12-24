import session from "express-session"
import User from "../models/UserModel.js"

export const Perfil = async (req,res) =>{
    try{
        const sessao = req.session.user
        
        const usuario = await User.find({email:sessao})

        res.json(usuario[0])

    }catch(e){
        console.log(e)
    } 
}