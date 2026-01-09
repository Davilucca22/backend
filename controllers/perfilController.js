import session from "express-session"
import User from "../models/UserModel.js"

export const Perfil = async (req,res) =>{
    try{
        const sessao = req.session.user

        const users = await User.findById(sessao)

        res.json(users)
        

    }catch(e){
        console.log(e)
    } 
}