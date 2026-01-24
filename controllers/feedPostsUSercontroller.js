import session from "express-session"
import User from "../models/UserModel.js"
import mongoose from "mongoose"


export const feedUser = async (req,res) =>{
    try{

        const id = req.session.user 
        const userId = new mongoose.Types.ObjectId(id)

                const feed = await User.aggregate([
            {$match:{_id:userId}}, //busca por user por id
            {$unwind:'$posts'}, //divide os posts em objs
            {$project:{ //formato de retorno
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
                },
            }}  

        ])

        res.json(feed)

    }catch(e){
        console.log("ERR: ", e)
    }
} 
