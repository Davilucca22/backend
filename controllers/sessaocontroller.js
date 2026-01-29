import session from "express-session"
import User from "../models/UserModel.js"

export const Sessao = async (req,res) =>{
    try{

        const id = req.session.user 
        const users = await User.findById(id).select("-senha")

        res.json(users)
        
    }catch(e){
        console.log("ERR: ", e)
    }
} 
