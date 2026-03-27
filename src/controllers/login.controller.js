import bcrypt from 'bcrypt'
import dados from '../services/auth.service.js'

const login = async (req,res)=>{
    try{
    const {email, password} = req.body 

    const user= await dados.loginService(email)

    if(!user){
        return res.status(404).send({message: "E-mail ou senha invalida"})
    }

    const isPasswordisvalid = await bcrypt.compare(password, user.password)

    if(!isPasswordisvalid){
        return res.status(404).send({message: "E-mail ou senha invalida"})
    }

    res.send({message: 'Login feito com sucesso'})
    }catch(err){
        res.status(500).send({message: err})
    }
}

export default {login}