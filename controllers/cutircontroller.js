import User from "../models/UserModel.js"

export const attcurtida = async (req,res) =>{
    
    const postId = req.params.id

    const post = await User.findOneAndUpdate({'posts._id':postId},{$inc:{'posts.$.curtidas':1}},{new:true})

    const page = Number(req.query.page) || 1 //pega a query do endpoint ou 1
    const limit = 10 // limite de paginas
    const skip = (page - 1) * limit //pula paginas anteriores
    
    const totalUsers = await User.countDocuments() // total de documentos no BD
    
    const users = await User.find()
    .sort({criadoem: -1}) //mais recente antes
    .skip(skip)
    .limit(limit)
    
    res.json({
        page,
        totalPage: Math.ceil(totalUsers / limit),
        data: users
    })

}
