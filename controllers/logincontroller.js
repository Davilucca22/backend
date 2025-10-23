import dotenv from 'dotenv'
dotenv.config()
import User from "../models/UserModel.js"
import argon2 from 'argon2'
import multer from "multer"
import {v4 as uuid} from "uuid"
import AWS from 'aws-sdk'

const upload = multer({storage:multer.memoryStorage()}) //armazena os arquivos enviados pelo front direto na memória RAM, e não no disco local.

const S3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACESS_KEY,
    region:process.env.AWS_REGION
})

export const cadastro = async (req,res) =>{
    try{

        const {nome, email,senha} = req.body 
        const file = req.file
     
        const SenhaHash = await argon2.hash(senha) //criptografia na senha

        //upload pro s3
        const ext = file.originalname.split(".").pop()
        const key = `usuarios/${uuid()}.${ext}`

        const params = {
            Bucket:process.env.S3_BUCKET_NAME,
            Key:key,
            Body:file.buffer,
            ContentType:file.mimetype,
        }

        const { Location } = await S3.upload(params).promise()

        const buscaEmail = await User.findOne({email:email})
        if(buscaEmail.email === email){
            res.json({msg:"email ja esta em uso"})
        }else{
            const user = await User.create({name:nome, email:email, senha:SenhaHash, fotoPerfil:Location}) //salva dados no banco de dados
            res.json({msg:"usuario salvo com sucesso"})
        }
        
    }catch(err){
        console.log(err)
    }
}
