import User from "../models/UserModel.js"

export const Sessao = async (req,res) =>{
    try{
        const id = req.user.id // Agora vem do JWT via middleware
        const users = await User.findById(id).select("-senha")

        res.json(users)

    }catch(e){
        console.log("ERR: ", e)
        res.status(500).json({ msgerr: 'Erro interno do servidor' })
    }
} 
