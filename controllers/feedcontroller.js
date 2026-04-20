import User from "../models/UserModel.js"

export const Feed = async (req,res) => {
    try{
        const userId = req.user.id; // ID do usuário logado

        const feed = await User.aggregate([
            {$match: {_id: {$ne: userId}}}, // Exclui o próprio usuário
            {$sample:{size:10}}, //pega usuarios aleatorios (excluindo o próprio)
            {$unwind:"$posts"}, //transforma array de posts em docs individuais
            {$sample:{size:30}}, //posts aleatorios desses usuarios
            {$project:{ //estrutura que irá para o front
                _id:0,
                userId:"$_id",
                name: 1,
                fotoPerfil: 1,
                post:{
                    _id:"$posts._id",
                    imgURL:"$posts.imgURL",
                    textoPost:"$posts.textoPost",
                    criadoem:"$posts.criadoem",
                    curtidas:"$posts.curtidas",
                    comentarios:"$posts.comentarios"
                }
            }}  

        ])

        res.json(feed)

    }catch(e){
        console.log(e)
    }
}
