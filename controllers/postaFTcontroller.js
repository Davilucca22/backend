import multer from "multer"
import { SalvaS3 } from "../middlewares/BDimagens.js"
import session from "express-session"
import User from "../models/UserModel.js"

export const Postar =  async (req,res) => {
    
    const sessao = req.session.user
    try{

        const upload = multer({storage:multer.memoryStorage()})

        const {comentario} = req.body
        const file = req.file

        if(!file){
           return res.status(400).json({erro:'arquivo nao enviado'})
        }

        const URLfoto = await SalvaS3(file)

        await User.updateOne({email:sessao},{$push:{
                posts:{
                    imgURL: URLfoto,
                    textoPost:comentario
                }
            }})

        res.json({msg:"dados recebidos"})

    }catch(e){
        console.log("erro gerado: ", e)
    }
}

