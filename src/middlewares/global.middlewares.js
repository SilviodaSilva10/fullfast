import mongoose from 'mongoose' 
import dados from '../services/user.service.js'

/*
export const auth = (req,res,next)=>{
    try{

    }catch(err){
        return res.status(500).send({message: err})
    }

}
*/



export const validId = (req,res,next)=>{
   try{ 
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({message:'Id invalido'})
    }

    req.id = id
    next()
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
}

export  const validUser = async (req,res,next)=>{
    try{
        const id = req.params.id

        const user = await dados.findUsersByIdService(id)

        if(!user){
            return res.status(400).send({message: 'O user não encontrado'})
        }

        req.user= user
        next()  }
    catch(err){
        res.status(500).send({message: err.message})
    }

}

