import express from 'express'
import dotenv from 'dotenv'
const app = express()

dotenv.config()

import userRote from './src/routes/user.route.js'
import loginRote from './src/routes/auth.route.js'
import newsRoute from './src/routes/news.route.js'
import swaggerRoute from './src/routes/swagger.route.cjs'

import connectDB from './src/data/db.js'
connectDB()

app.use(express.json())

app.use('/user', userRote)
app.use('/auth', loginRote)
app.use('/posts', newsRoute)
app.use('/doc', swaggerRoute)


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Servidor rodando ${port}`)
})