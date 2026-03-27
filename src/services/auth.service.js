import user from '../models/User.model.js'

const loginService = (email)=>user.findOne({email: email}).select('password')

export default {loginService}