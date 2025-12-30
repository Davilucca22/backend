import User from "../models/UserModel.js"

export const attcurtida = async (req,res) =>{
    
    const {postId, QTDcurtida} = req.body

    const post = await User.updateOne({'posts._id':postId},{curtidas:QTDcurtida}) //ainda nao funciona
}
