import session from "express-session";
import User from "../models/UserModel.js";

export const DeixaSeguir = async (req,res) => {
    const { IdOutro } = req.body
    const sessao = req.session.user

    const Eu = await User.findByIdAndUpdate(sessao,{$pull:{seguindo:{IDseguindo:IdOutro}}})

    const Ele = await User.findByIdAndUpdate(IdOutro,{$pull:{seguidores:{IDseguidor:sessao}}})

    res.json({msg:'deixou de seguir'})
}