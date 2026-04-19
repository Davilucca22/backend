import User from "../models/UserModel.js";

export const attdados = async (req,res) => {
    

    const {postagens}  = req.body // posts que estao sendo mostrados no 

    const postsIDs = postagens.map(item => item.post._id) //pega os IDs dos posts

    const users = await User.find( //busca apenas os posts que estao no feed
        {"posts._id": { $in: postsIDs } },
        { posts:1 }
    )

    const postMap = new Map() //cria um mapa para acesso rapido

    users.forEach(user => {
        user.posts.forEach(post =>{
            postMap.set(post._id.toString(), post)
        })
    })

    const feedAtualizado = postagens.map(item => { //atualiza as curtidas e comentarios dos posts
        const postatualizado = postMap.get(item.post._id.toString())

        if(postatualizado){
            item.post.curtidas = postatualizado.curtidas
            item.post.comentarios = postatualizado.comentarios 
        }

        return item
    })

    res.json(feedAtualizado) //retorna os posts atualizados para o front
}
