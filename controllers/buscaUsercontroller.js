import User from "../models/UserModel.js"

export const Busca = async (req,res) =>{
    const { nome } = req.query

    const users = await User.find({name:{ $regex: nome, $options:'i'}}) //regex verifica se contem a string passada na chave; options ignora M e m
    .select('-senha -email -posts -seguindo -seguidores -dataNasc') // tira esses dados do retorno pro front

    res.json(users)
}
