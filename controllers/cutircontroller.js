import User from "../models/UserModel.js"

export const attcurtida = async (req,res) =>{
    
    const postId = req.params.id

    const post = await User.findOneAndUpdate({'posts._id':postId},{$inc:{'posts.$.curtidas':1}},{new:true})

}
