import mongoose from 'mongoose'
const uri = 'mongodb://localhost:27017/agenda'

console.log('Conectando ao MongoDB...') 
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI|| uri)
    .then( () => console.log('MongoDB conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDB:', err) )

}
export default connectDB