import session from "express-session"
import User from "../models/UserModel.js"

export const Feed = async (req,res) => {
    try{
        const sessao = req.session.user
        
        const usuario =  await User.find({email:sessao}) //retorna um array com os resultados, por isso deve usar [0]

        res.json(usuario[0])

    }catch(e){
        console.log(e)
    }
}
