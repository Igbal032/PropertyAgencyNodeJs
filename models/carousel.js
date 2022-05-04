const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    topic:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    imgPath:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Carousel",carouselSchema);