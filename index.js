import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config() // Configurar o dotenv o mais cedo possível

const app = express()

// 1. O CORS deve vir ANTES de qualquer outro middleware ou rota
app.use(cors({
  // Adicione a URL do Swagger/Doc se for diferente, ou use '*' para testar
  origin: ['https://fullfast-api.onrender.com', 'https://fullfast.onrender.com'], 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Middleware para processar JSON
app.use(express.json())

// 3. Conexão com o banco (Mantenha aqui)
import connectDB from './src/data/db.js'
connectDB()

// 4. Suas Rotas
import userRote from './src/routes/user.route.js'
import loginRote from './src/routes/auth.route.js'
import newsRoute from './src/routes/news.route.js'
import swaggerRoute from './src/routes/swagger.route.cjs'

app.use('/user', userRote)
app.use('/auth', loginRote)
app.use('/posts', newsRoute)
app.use('/doc', swaggerRoute)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})