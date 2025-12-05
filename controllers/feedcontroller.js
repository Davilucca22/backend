import session from "express-session"

export const Feed = async (req,res) => {
    try{
        const sessao = req.session.user
        console.log(sessao)

        res.json(sessao)

    }catch(e){
        console.log(e)
    }
}
