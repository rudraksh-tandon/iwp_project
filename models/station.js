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
// const station = new Station({
//     stName:'Bangalore Jn',
//     trainName:'Kalka Mail Rajdhani',
//     trainNo:13,
//     origin:'New Delhi Jn',
//     destination:'Bangalore Jn',
//     noOfPlatform:12
// })
// station.save().then(()=>{
//     //console.log(train)
// }).catch((e)=>{
//     //console.log(e)
// })

module.exports = Station
