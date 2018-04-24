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
  time: String,
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
  Meal.find({ date: req.params.mealDate }, (err, meals)=>{
    if (err || meals.length === 0) {
      res.json({result:'meal not found.'})
    }else{
      req.meals = meals
      req.meal = meals[0]
      next()
    }
  })
}

app.get('/:mealDate', mealParser)
app.delete('/:mealDate', mealParser)

//Show all meals
app.get('/', (req, res) => {
  Meal.find().then(meals => {
    res.json(meals)
  })
})

//Search for meals on a given date
app.get('/:mealDate',(req,res)=>{
    res.json({
      result:'Success',
      meals: req.meals
    })
})

//Store meals that are given
<<<<<<< HEAD
app.put('/:mealName',(req, res) => {
  console.log("Create order for", req)

=======
app.put('/:mealDate',(req, res) => {
>>>>>>> be6932b481253877604d136744a25b521895c15e
  var meal = Meal({
    name: req.body.mealName,
    date: req.body.date,
    time: req.body.time,
    calories: req.body.calories,
    carbs: req.body.carbs
  })
  meal.save()

  res.json({
    result:'Success',
    meal: meal
  })
})

app.delete('/:mealDate',(req,res)=>{
  Meal.remove({_id:req.meal._id}, err=>{
    if (err) {
      res.json({result: "error", message: err})
    }else{
      res.json({result:"Success"})
    }
  })
})


app.listen(3000, () => console.log('Meal server listening on port 3000!'))
