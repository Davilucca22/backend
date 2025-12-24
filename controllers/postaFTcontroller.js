import multer from "multer"
import { SalvaS3 } from "../middlewares/BDimagens.js"
import session from "express-session"
import User from "../models/UserModel.js"

export const Postar =  async (req,res) => {

    const sessao = req.session.user
    req.session.user = sessao

    res.json({msg:"dados recebidos"})

    try{

        const upload = multer({storage:multer.memoryStorage()})

        const {comentario} = req.body
        const file = req.file

        if(file){
            
            const URLfoto = SalvaS3(file)
            
            const localFoto = URLfoto.then(res => res)

            const novo = {img:localFoto, texto:comentario}

            const dados = await User.updateOne({email:sessao},{$push:{posts:novo}})

        }

    }catch(e){
        console.log("erro gerado: ", e)
    }
}

