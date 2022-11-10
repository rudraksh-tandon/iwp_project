const mongoose = require('mongoose')
const validator = require('validator')

const stationSchema = new mongoose.Schema({
    stName:{
        type:String,
    },
    trainNo:{
        type:String
    },
    trainName:{
        type:String
    },
    origin:String,
    destination:String,
    noOfPlatform:Number
})

const Station = mongoose.model('Station', stationSchema)

 // This is for adding station to the database ......
const station = new Station({
    stName:'Varanasi Jn',
    trainName:'Humayun Express',
    trainNo:16,
    origin:'New Delhi',
    destination:'Ahmedabad',
    noOfPlatform:9
})
station.save().then(()=>{
    //console.log(train)
}).catch((e)=>{
    //console.log(e)
})

module.exports = Station
