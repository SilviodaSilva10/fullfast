import express from 'express'
const app = express()

import userRote from './src/routes/user.route.js'

import connectDB from './src/dbs/db.js'
connectDB()

app.use(express.json())

app.use('/user', userRote)


app.listen(3000, ()=>{
    console.log('Servidor rodando')
})