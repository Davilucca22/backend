import session from "express-session"
import User from "../models/UserModel.js"


export const Sessao = async (req,res) =>{
    try{

        const email = req.session.user
        const usuario = await User.findOne({email})

        res.json(usuario)

    }catch(e){

        console.log("ERR: ", e)

    }
}