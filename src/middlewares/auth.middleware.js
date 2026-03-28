import dotenv from 'dotenv'
import dados from '../services/user.service.js'
import jwt from 'jsonwebtoken'

dotenv.config()

export const authMiddleware = (req,res,next)=>{
  try{
    
    const{authorization} = req.headers

    if(!authorization){
        return res.send('token não autorizado')
    }

    const part = authorization.split(" ")

    

    if(part.length  !== 2){
        return res.send('token e bearer invalida')
    }

    const [schema, token] = part

    if(schema !== 'Bearer'){
        return res.send('erro de Bearer')
    }

    jwt.verify(token, process.env.Secret_jwt,async(error, decoded)=>{
        if(error){
            console(error)
        }
        
        const user = await dados.findUsersByIdService(decoded.id)
        if(!user || !user._id){
            return res.status(401).send({message: 'user ou token invalido'})
        }

        
        req.userId = user._id
        next()
    })

    
  }catch(err){
    return res.status(500).send({message: err})
  }
} 