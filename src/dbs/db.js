import mongoose from 'mongoose'

console.log('Conectando ao MongoDB...') 
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then( () => console.log('MongoDB conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDB:', err) )

}
export default connectDB