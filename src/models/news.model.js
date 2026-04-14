import mongoose from 'mongoose'

const NewsChema = new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    text:{
        type: String,
        require: true
    },
    banner: {
        type: String,
        require: true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    likes:{
        type: Array,
        require:true,
    },
    coments:{
        type: Array,
        require: true
    }
})

const news = mongoose.model('News', NewsChema)


export default news 