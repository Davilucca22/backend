const { text, request } = require('express')
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
            },
            fotoDono:{
                type:String
            }
        }]
    }],
    seguidores:[{
        IDseguidor:{
            type:String
        }
    }],
    seguindo:[{
        IDseguindo:{
            type:String
        }
    }],
    biografia:{
        type:String,
        required:false
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User
