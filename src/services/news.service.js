import news from '../models/news.model.js'

export const createNews = (body)=>news.create(body)
export const findAllNews= (offset, limit)=> news.find().sort({_id: -1}).skip(offset).limit(limit).populate('user') 
export const newsCount = ()=>news.countDocuments()
export const topnewsService = ()=> news.findOne().sort({_id: -1}).populate('user')
export const findbyIdService= (id)=>news.findById(id).populate('user')
export const searchbytitleService = (title)=>news.find({
        title:{$regex: `${title || ""}`, $options:"i"}
    }).sort({_id: -1}).populate('user')

export const byUserService = (id) =>news.find({user: id}).sort({_id: -1}).populate('user')
export const updateService= (id,titulo,text,banner)=> news.findOneAndUpdate({_id:id},{titulo,text,banner})