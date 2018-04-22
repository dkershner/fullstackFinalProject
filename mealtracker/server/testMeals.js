const fetch = require('node-fetch')

var pasta = {
	name: "Pasta",
	date: "04/21/2017",
	calories: 15,
	carbs: 25
}
var bagel =
{
	name: "Bagel",
	date: "04-20-2017",
	calories: 20,
	carbs: 50
}

var findDate = "04-20-2017"

function getall(){
 return fetch("http://localhost:3000/").then(resp=>resp.json())
}

function cleanup(meal){
  //delete all of the meals.
  return fetch('http://localhost:3000/'+meal, {method: 'DELETE'})
}

function createMeal(mealName, params){
  return fetch('http://localhost:3000/'+mealName,
	{
	  method: 'PUT',
	  headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
    })
      .then(r=>r.json())
}

function getMeal(mealDate){
 	return fetch("http://localhost:3000/" + mealDate).then(resp=>resp.json())
}

createMeal(bagel.date, bagel).then(()=>{

    getMeal(findDate).then(r => {
      console.log("--All meals on date--")
      console.log(r)

      cleanup(findDate).then( ()=>{
        console.log("--All Done!--")

        // double check!
        getall().then(r => {
          console.log("--All meals--")
          console.log(r)
        })
    })
  })
})
