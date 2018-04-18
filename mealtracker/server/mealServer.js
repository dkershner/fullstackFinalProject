const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('../config.json'))
mongoose.connect(config.dburl)
var db = mongoose.connection

// The meal schema
var mealSchema = mongoose.Schema({
  name: String,
  date: String,
  calories: Number,
  carbs: Number
})

// bind the schema to the collection in mongodb
var Meal = mongoose.model('meals', mealSchema)

var cleanDb = false

if (cleanDb === true) {
  Meal.remove({}, err=>{
    if(err) consolelog("failed to remove all meals")
  })
}

app.use(bodyParser.json())


function mealParser(req, res, next) {
  Meal.find({name: req.params.mealName}, (err, meals)=>{
    if (err || meals.length === 0) {
      res.json({result:'meal not found.'})
    }else{
      req.meal = meals[0]
      next()
    }
  })
}

app.get('/:mealName', mealParser)
app.delete('/:mealName', mealParser)

//Show all meals
app.get('/', (req, res) => {
  Meal.find().then(meals => {
    res.json(meals)
  })
})

//Search for meals
app.get('/:mealName',(req,res)=>{
    res.json({
      result:'Success',
      meal: req.meal
    })
})

//Store meals that are given
app.put('/:mealName',(req, res) => {
  console.log("Create order for", req)
  
  var meal = Meal({
    name: req.params.mealName,
    date: req.body.date,
    calories: req.body.calories,
    carbs: req.body.carbs
  })
  meal.save()

  res.json({
    result:'Success',
    meal: meal
  })
})

app.delete('/:mealName',(req,res)=>{
  Meal.remove({_id:req.meal._id}, err=>{
    if (err) {
      res.json({result: "error", message: err})
    }else{
      res.json({result:"Success"})
    }
  })
})


app.listen(3000, () => console.log('Meal server listening on port 3000!'))
