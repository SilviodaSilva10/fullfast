import user from '../models/User.model.js'
import jwt from 'jsonwebtoken'

const loginService = (email)=>user.findOne({email: email}).select('password')

const geradortoken = (id)=>jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: 86400})

export default {loginService,  geradortoken}