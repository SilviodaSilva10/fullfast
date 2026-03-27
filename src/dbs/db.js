import mongoose from 'mongoose'

console.log('Conectando ao MongoDB...') 
const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/agenda')
    .then( () => console.log('MongoDB conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDB:', err) )

}
export default connectDB