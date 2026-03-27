import user from '../models/User.model.js'
import jwt from 'jsonwebtoken'

const loginService = (email)=>user.findOne({email: email}).select('password')

export default {loginService}