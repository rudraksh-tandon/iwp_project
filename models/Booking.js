const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    Train_number:{
        type:Number,
        required:true
    },
    Train_name:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    date:Date,
    status:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const booking = mongoose.model('booking', bookingSchema)

module.exports = booking