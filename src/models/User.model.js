const mongoose = require('mongoose')

const UserChema  = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    telefone:{
        type:String,
        require:true
    },
    senha:{
        type:String,
        require:true
    }
})

const user = mongoose.model('user', UserChema)

module.exports= user