import User from "../models/UserModel.js"

export const Perfil = async (req,res) =>{
    try{
        const sessao = req.user.id

        const users = await User.findById(sessao)

        res.json(users)
        

    }catch(e){
        console.log(e)
    } 
}