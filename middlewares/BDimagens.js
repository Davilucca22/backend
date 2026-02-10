import {v4 as uuid} from "uuid"
import AWS from 'aws-sdk'

const S3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACESS_KEY,
    region:process.env.AWS_REGION
})

export const SalvaS3 = async (imagem) =>{

    let key
    let fotoURL
    if(imagem){

        const ext = imagem.originalname.split(".").pop()
        key = `usuarios/${uuid()}.${ext}`
        
        const params = {
            Bucket:process.env.S3_BUCKET_NAME,
            Key:key,
            Body:imagem.buffer,
            ContentType:imagem.mimetype,
        }

        const { Location } = await S3.upload(params).promise()

        return Location

    }else{

        key = "usuarios/semfoto/semfoto.jpeg" //se o usuario nao enviar foto, sera usada a foto padrao q esta nesse caminho no S3

        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` //url da foto
    }
}

export const DeletaS3 = async (url) => {
    if(!url) return

    const key = url.split(".amazonaws.com/")[1]
    console.log("chave:",key)

    await S3.deleteObject({
        Bucket:process.env.S3_BUCKET_NAME,
        Key:key
    }).promise()
}
