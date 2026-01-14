import User from "../models/UserModel.js"
import session from "express-session"

export const EditaInfo = async (req,res) =>{
    const sessao = req.session.user
    const {email, dataNasc } = req.body

    try{
        const users = await User.findByIdAndUpdate(sessao,{email:email,dataNasc:dataNasc})
        res.json({msg:"dados atualizados"})

    }catch(e){
        res.json({erro:'erro ao atualizar dados'})
    }
}
