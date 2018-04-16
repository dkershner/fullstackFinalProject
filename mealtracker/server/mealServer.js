const express = require('express')
const app = express()

//Variables
var meals = {}
var mealId = 0

app.get('/', (req, res) => res.send('Hello World!'))

//Search for meals
app.get('/:date',(req,res)=>{
  if(req.params.date in userMeals){
    res.json({
      result:'Success',
      meal: userMeals[req.param.date]
    })
  }else{
    res.json({result:'Meal Not Listed'})
  }
})


//Store meals that are given
app.put('/:date',(req, res) => {
  userMeals[req.params.date]={number:mealId}
  mealId+=1
  res.json({
    result:'success',
    meal: userMeals[req.params.date]
  })
})

app.delete('/:date',(req,res)=>{
  if(req.params.date in meals){
    delete meals[req.params.date]
    res.json({result:'Success'})
  }else{
    res.json({result:'Meal not found'})
  }
})


app.listen(3000, () => console.log('Meal server listening on port 3000!'))
