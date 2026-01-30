import session from "express-session";
import User from "../models/UserModel.js";

export const DeixaSeguir = async (req,res) => {
    const { IdOutro } = req.body
    const sessao = req.session.user

    const Eu = await User.updateOne({_id:sessao},{$pull:{seguindo:{IDseguindo:IdOutro}}})

    const Ele = await User.updateOne({_id:IdOutro},{$pull:{seguidores:{IDseguidor:sessao}}})

    res.json({msg:'nao sigo mais'})
}