import multer from "multer";
import User from "../models/UserModel.js";
import session, { Session } from "express-session";
import { SalvaS3, DeletaS3 } from "../middlewares/BDimagens.js";

export const EditPerfil = async (req,res) => {
    const sessao = req.session.user

    try{
        const upload = multer({storage:multer.memoryStorage()})
    
        const {nome, bio, foto} = req.body
        const file = req.file
        
        let fotofinal = foto
    
        if(file){

            await DeletaS3(foto) //apaga a foto antiga antes de mandar a nova

            const URLfoto = await SalvaS3(file)
            fotofinal = URLfoto
        }

        const users = await User.findByIdAndUpdate(sessao,{name:nome,fotoPerfil:fotofinal,biografia:bio},{new:true})
        res.json(users)
        
    }catch(e){
        res.json({erro:e})
    }

}
