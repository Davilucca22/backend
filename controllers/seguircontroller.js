import User from "../models/UserModel.js"

export const Seguir = async (req,res) => {
    const {IdOutro, nameSeguindo, urlFoto} = req.body

    const sessao = req.user.id //apenas o id do usuario autenticado

    const users = await User.findById(sessao) //dados do usuario da sessao

    const Eu = await User.findByIdAndUpdate(sessao,{$push:{ //adiciona a lista de seguindo do usuario da sessao
        seguindo:{
            IDseguindo:IdOutro,
            nameSeguindo,
            urlFoto
        }
    }})

    const Ele = await User.findByIdAndUpdate(IdOutro,{$push:{ //adiciona a lista de seguidores do usuario clicado
        seguidores:{
            IDseguidor:sessao,
            nameSeguidor:users.name,
            urlFoto:users.fotoPerfil
        }
    }})

    res.json({msg:'seguindo'})
}