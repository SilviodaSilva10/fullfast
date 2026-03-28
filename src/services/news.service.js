import news from '../models/news.model.js'

const create = (body)=>news.create(body)
const findAll = ()=>news.find()

export default {create,findAll}