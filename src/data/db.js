import mongoose from 'mongoose'


console.log('Conectando ao MongoDB...') 
const connectDBlocal = () => {
    mongoose.connect(process.env.MONGO_URI_TEST)
    .then( () => console.log('MongoDBLocal conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDBLocal:', err) )

}

const connectDBatlas= ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log('MongoDBAtlas conectado') )
    .catch( (err) => console.error('Erro ao conectar ao MongoDBAtlas:', err) )
}

let connectDB = connectDBatlas

/*
if(!connectDB.errno){
    connectDB = connectDBlocal
}
*/
export default connectDB