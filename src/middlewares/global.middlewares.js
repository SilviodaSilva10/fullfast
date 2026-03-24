const mongoose = require('mongoose')
const user = require('../services/user.service')

const validId = (req,res,next)=>{
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:'Id invalido'})
    }

    next()
}

const validUser = (req,res,next)=>{
    const id = req.params.id

}

module.exports={validId,validUser}