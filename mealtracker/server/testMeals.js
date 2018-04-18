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
	date: "04/20/2017",
	calories: 20,
	carbs: 50
}

function getall(){
 return fetch("http://localhost:3000/").then(resp=>resp.json())
}

function cleanup(meal){
  //delete all of the meals.
  return fetch('http://localhost:3000/'+meal, {method: 'DELETE'})
}

function createMeal(mealName){
  return fetch('http://localhost:3000/'+mealName, {method: 'PUT'})
}

createMeal(bagel).then(()=>{

    getall().then(r => {
      console.log("--All meals--")
      console.log(r)

      cleanup(bagel).then( ()=>{
        console.log("--All Done!--")

        // double check!
        getall().then(r => {
          console.log("--All meals--")
          console.log(r)
        })
    })
  })
})