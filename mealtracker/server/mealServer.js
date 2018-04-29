const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json'))
mongoose.connect(config.dburl)
var db = mongoose.connection

// The meal schema
var mealSchema = mongoose.Schema({
  name: String,
  date: String,
  time: String,
  calories: Number,
  carbs: Number,
  userID: String
})

// bind the schema to the collection in mongodb
var Meal = mongoose.model('meals', mealSchema)

var cleanDb = false

//method to clear out the database
if (cleanDb === true) {
  Meal.remove({}, err=>{
    if(err) consolelog("failed to remove all meals")
  })
}

app.use(bodyParser.json())

//Required for cross domain requests
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "PUT,GET,DELETE")
  next()
})

function mealParser(req, res, next) {
Meal.find({ date: req.params.mealDate, userID: req.params.user}, (err, meals)=>{
    if (err || meals.length === 0) {
      res.json({result:'meal not found.'})
    }else{
      req.meals = meals
      req.meal = meals[0]
      next()
    }
  })
}

app.get('/:mealDate/:user', mealParser)

//Show all meals
app.get('/', (req, res) => {
  Meal.find().then(meals => {
    res.json(meals)
  })
})

//Search for meals on a given date for the user
app.get('/:mealDate/:user',(req,res)=>{
    res.json({
      result:'Success',
      meals: req.meals
    })
})

//Store meal that is given
app.put('/:mealDate',(req, res) => {
  var meal = Meal({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    calories: req.body.calories,
    carbs: req.body.carbs,
    userID: req.body.userID
  })
  meal.save()

  res.json({
    result:'Success',
    meal: meal
  })
})

//Delete a meal
app.delete('/:mealDate',(req,res)=>{
  Meal.remove({_id:req.body._id}, err=>{
    if (err) {
      res.json({result: "error", message: err})
    }else{
      res.json({result:"Success"})
    }
  })
})


app.listen(3000, () => console.log('Meal server listening on port 3000!'))
