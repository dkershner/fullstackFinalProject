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

})
