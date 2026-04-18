import mongoose from 'mongoose'

console.log('Conectando ao MongoDB...') 

const connectDBatlas= ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('MongoDBAtlas conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDBAtlas:', err) )
}

let connectDB = connectDBatlas

export default connectDB