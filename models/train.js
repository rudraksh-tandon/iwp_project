const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
    trNo:{
        type:Number,
        required:true
    },
    trName:{
        type:String,
        required:true
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    runsOn:[{
        days:{
            type:String,
            required:true
        },
    }],
    date:Date
})

const Train = mongoose.model('Train', trainSchema)

// This is for adding trains to the database ......
const train = new Train({
    trName:'Chennai Express',
    trNo:16,
    start:'Chennai Jn',
    end:'Banglore Jn',
    // runsOn:[{days:'Tuesday'},{days:'Saturday'},{days:'Friday'}],
    runsOn:[{days:'Wednesday'},{days:'Monday'},{days:'Sunday'},{days:'Saturday'}]
})
train.save().then(()=>{
    //console.log(train)
}).catch((e)=>{
    //console.log(e)
})
module.exports = Train
