const mongoose = require('mongoose')
const dados = require('../services/user.service')

const validId = (req,res,next)=>{
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:'Id invalido'})
    }

    req.id = id
    next()
}

const validUser = async (req,res,next)=>{
    const id = req.params.id

    const user = await dados.findUsersByIdService(id)

    if(!user){
        return res.status(400).send({message: 'O user não encontrado'})
    }

    req.user= user
    next()

}

module.exports={validId,validUser}