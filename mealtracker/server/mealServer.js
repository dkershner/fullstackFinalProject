const express = require('express')
const app = express()

//Variables
var meals = {}
var mealId = 0

app.get('/', (req, res) => res.send('Hello World!'))

//Search for meals
app.get('/:mealName',(req,res)=>{
  if(req.params.mealName in userMeals){
    res.json({
      result:'Success',
      meal: userMeals[req.param.mealName]
    })
  }else{
    res.json({result:'Meal Not Listed'})
  }
})


//Store meals that are given
app.put('/:mealName',(req, res) => {
  userMeals[req.params.mealName]={number:mealId}
  mealId+=1
  res.json({
    result:'success',
    meal: userMeals[req.params.mealName]
  })
})

app.delete('/:mealName',(req,res)=>{
  if(req.params.mealName in meals){
    delete meals[req.params.mealName]
    res.json({result:'Success'})
  }else{
    res.json({result:'Meal not found'})
  }
})


app.listen(3000, () => console.log('Meal server listening on port 3000!'))
