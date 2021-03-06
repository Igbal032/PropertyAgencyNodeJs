const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        require: true,
    },
    about:{
        type: String,
        require: true,
    },
    logo:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Company', companySchema)