const express = require('express')
const app = express()

const userRote = require('./src/routes/user.route')

const connectDB = require('./src/dbs/db')
connectDB()

app.use(express.json())

app.use('/user', userRote)


app.listen(3000, ()=>{
    console.log('Servidor rodando')
})