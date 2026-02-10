import User from "../models/UserModel.js"

export const Busca = async (req,res) =>{
    const { nome } = req.query

    const users = await User.find({name:{ $regex: nome, $options:'i'}}).select('-senha -email -posts -seguindo -seguidores -dataNasc')

    console.log(users)

    res.json(users)
}
