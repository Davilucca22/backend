import dotenv from 'dotenv'
dotenv.config()
import User from "../models/UserModel.js"
import argon2 from 'argon2'
import multer from "multer"
import {v4 as uuid} from "uuid"
import AWS from 'aws-sdk'
import session from 'express-session'

const upload = multer({storage:multer.memoryStorage()}) //armazena os arquivos enviados pelo front direto na memória RAM, e não no disco local.

const S3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACESS_KEY,
    region:process.env.AWS_REGION
})

export const cadastro = async (req,res) =>{
    try{

        const {nome, email,senha,dataNasc} = req.body 
        const file = req.file
     
        const SenhaHash = await argon2.hash(senha) //criptografia na senha

        let key 
        let fotoURL
        if(file){
            //upload pro s3
            const ext = file.originalname.split(".").pop()
            key = `usuarios/${uuid()}.${ext}`
            
            const params = {
                Bucket:process.env.S3_BUCKET_NAME,
                Key:key,
                Body:file.buffer,
                ContentType:file.mimetype,
            }

            const { Location } = await S3.upload(params).promise()

            fotoURL = Location

        }else{

            key = "usuarios/semfoto/semfoto.jpeg" //se o usuario nao enviar foto, sera usada a foto padrao q esta nesse caminho no S3

            fotoURL = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` //url da foto
        }

        const users = await User.findOne({ email })

        if(users){
            res.json({msg:"Email ja cadastrado"})
        }else{
            const infos = {name:nome, email:email, senha:SenhaHash, fotoPerfil:fotoURL, dataNasc:dataNasc, posts:[],infos:{seguidores: 0, seguindo: 0}}
            const user = await User.create(infos) //salva dados no banco de dados
            req.session.user = email
            res.json({msg:"seja bem vindo"})
        }

    }catch(err){
        console.log(err)
    }

}
