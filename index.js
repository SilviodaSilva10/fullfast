import express from 'express'
import dotenv from 'dotenv'
const app = express()

dotenv.config()

import userRote from './src/routes/user.route.js'
import loginRote from './src/routes/auth.route.js'

import connectDB from './src/dbs/db.js'
connectDB()

app.use(express.json())

app.use('/user', userRote)
app.use('/auth', loginRote)


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Servidor rodando ${port}`)
})