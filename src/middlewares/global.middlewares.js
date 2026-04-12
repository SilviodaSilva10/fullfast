import mongoose from 'mongoose' 
import dados from '../services/user.service.js'
import * as news from '../services/news.service.js'
import { authMiddleware } from './auth.middleware.js'
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

export const validEdit = async(req,res,next)=>{
    const {titulo,text,banner} = req.body
    
    if(!titulo && !text && !banner){
        return res.status(400).send({message: 'Preencha o um dos campos '})
    }

    req.postEdit = {titulo,text,banner}
    next()
}

export const validOwner = async (req,res,next) => {
    const {id} = req.params

    const post = await news.findbyIdService(id)

    if(String(post.user._id) != String(req.userId)){
        return res.status(400).send({message: 'Não tem permissão'})
    }


    req.postId = id
    next()
}