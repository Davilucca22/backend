import User from "../models/UserModel.js"

export const Feed = async (req,res) => {
    try{

        const feed = await User.aggregate([
            {$sample:{size:10}}, //pega usuarios aleatorios
            {$unwind:"$posts"}, //transforma array de posts em docs individuais
            {$sample:{size:30}}, //posts aleatorios desses usuarios
            {$project:{ //estrutura que ira para o front
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
