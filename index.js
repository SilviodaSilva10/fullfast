import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.js'
const app = express()

dotenv.config()

import userRote from './src/routes/user.route.js'
import loginRote from './src/routes/auth.route.js'
import newsRoute from './src/routes/news.route.js'

import connectDB from './src/data/db.js'

// Conectar ao banco de dados
connectDB().then(() => {
    console.log('Banco de dados conectado, iniciando servidor...')
}).catch((err) => {
    console.error('Falha ao conectar ao banco:', err)
    process.exit(1)
})

app.use(express.json())

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/user', userRote)
app.use('/auth', loginRote)
app.use('/news', newsRoute)


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Servidor rodando ${port}`)
})