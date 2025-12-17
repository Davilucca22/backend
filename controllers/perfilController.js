import session from "express-session"

export const Perfil = async (req,res) =>{
    try{

        const sessao = req.session
        res.json(sessao)

    }catch(e){
        console.log(e)
    } 
}