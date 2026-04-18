import mongoose from 'mongoose'

console.log('Conectando ao MongoDB...') 

const connectDBatlas = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDBAtlas conectado'))
    .catch((err) => {
        // Criando um erro personalizado com mais contexto
        const erroPersonalizado = new Error("Falha Crítica: Não foi possível alcançar o cluster do Atlas.");
        console.error(erroPersonalizado.message);
        console.error("Detalhes técnicos:", err.message);
    });
}
let connectDB = connectDBatlas

export default connectDB