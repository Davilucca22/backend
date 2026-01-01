const { text } = require('express')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    senha:{
        type:String,
        required:true
    },
    fotoPerfil:{
        type:String,
        required:true
    },
    dataNasc:{
        type:String,
        required:true
    },
    
    posts:[{
        imgURL:{
            type:String,
            required:true
        },
        textoPost:{
            type:String,
            required:false
        },
        criadoem:{
            type:Date,
            default:Date.now()
        },
        curtidas:{
            type:Number,
            default:0
            
        },
        comentarios:[{
            textoComentario:{
                type: String
            },
            donoComentario:{
                type:String
            }
        }]
    }],

    infos:{
        seguidores:{
            type:Number,
            default:5
        },
        seguindo:{
            type:Number,
            default:4 
        }
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User
