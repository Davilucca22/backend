import User from "../models/UserModel.js"
import session from "express-session"

export const Feed = async (req,res) => {
    try{
        const EmailSession = req.session.user
        const users = await User.findOne({email:EmailSession.email})

        res.json(users)

    }catch(e){
        console.log(e)
    }
}
