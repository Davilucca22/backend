import User from "../models/UserModel.js"

export const attcurtida = async (req,res) =>{

    try{
        const { PostID, UserID } = req.body
    
        const user = await User.findOne({ 'posts._id' : PostID })
        const postAtual = user.posts.id(PostID) // busca o post correspondente
    
        const jaCurtiu = postAtual.curtidas.includes(UserID)
    
        await User.updateOne(
            {'posts._id':PostID},
            jaCurtiu
            ? {$pull:{'posts.$.curtidas': UserID}}
            : {$addToSet: {'posts.$.curtidas': UserID}}
        )

        res.json({msg:'curtido ok'})

    }catch(e){
        res.json({msg:'erro no back'})
    }
    



}
