import session from "express-session"

export const Feed = async (req,res) => {
    try{
        const sessao = req.session.user

        res.json(sessao)

    }catch(e){
        console.log(e)
    }
}
