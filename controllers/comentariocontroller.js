import User from "../models/UserModel.js";
import session from "express-session";

export const comentario = async (req,res) => {
    const {IDpost,nome, foto, comentario} = req.body

    const sessao = req.session.user

    const users = await User.findOneAndUpdate(
        {'posts._id':IDpost},
        {$push:{
            'posts.$.comentarios':{
                textoComentario:comentario,
                donoComentario:nome,
                fotoDono:foto
            }
            }
        },
        {new:true}
    )

    res.json(users)
}
