const mongoose = require('mongoose')
const validator = require('validator')

const mealsSchema = new mongoose.Schema({
    outlets:String,
    time:String,
    phNo:Number
})

const Meals = mongoose.model('Meals', mealsSchema)

// This is used for adding meals to database
const meal = new Meals({
    outlets:'Vinay Hotel',
    time:'8am to 5pm',
    phNo:7993271123
})
meal.save().then(()=>{
    //console.log(train)
}).catch((e)=>{
    //console.log(e)
})


module.exports = Meals
