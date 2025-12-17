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
    posts:{
        type:Array,
        require:false      
    },
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
