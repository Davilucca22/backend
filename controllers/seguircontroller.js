import session from "express-session"
import User from "../models/UserModel.js"

export const Seguir = async (req,res) => {
    const {IdOutro} = req.body
    const sessao = req.session.user

    const Eu = await User.findByIdAndUpdate(sessao,{$push:{
        seguindo:{
            IDseguindo:IdOutro
        }
    }})

    const Ele = await User.findByIdAndUpdate(IdOutro,{$push:{
        seguidores:{
            IDseguidor:sessao
        }
    }})

    res.json({msg:'tudo certo chefia'})
}