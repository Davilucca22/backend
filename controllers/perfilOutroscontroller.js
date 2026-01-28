import mongoose from "mongoose"
import User from "../models/UserModel.js"

//manda as informaçoes do perfil do usuario clicado
export const PerfilOutro = async (req,res) => {
    try{
        const { id } = req.params

        const feed = await User.findById(id).select('-senha -email -dataNasc')
        console.log(feed)

        res.json(feed)

    }catch(e){
        res.json({err:"erro no backend:", e})
    }
}