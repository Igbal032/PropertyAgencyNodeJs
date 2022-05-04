const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    imgPath:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Service', serviceSchema)