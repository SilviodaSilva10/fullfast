import news from '../models/news.model.js'

const createNews = (body)=>news.create(body)
const findAllNews= (offset, limit)=> news.find().sort({_id: -1}).skip(offset).limit(limit).populate('user') 
const newsCount = ()=>news.countDocuments()
const topnewsService = ()=> news.findOne().sort({_id: -1}).populate('user')

export default {createNews,findAllNews, newsCount, topnewsService}