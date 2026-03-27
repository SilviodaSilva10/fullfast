import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserChema  = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    avatar: {
        type: String,
        required:true,
    },
    background: {
        type: String,
        required: true
    }
})


UserChema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password,10)
    
})

const user = mongoose.model('user', UserChema)

export default user