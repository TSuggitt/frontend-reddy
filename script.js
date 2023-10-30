const fruitform = document.querySelector("#inputSection form")

//when someone submits the form, we extract the fruit that they have submitted
fruitform.addEventListener("submit", extractFruit)


function extractFruit(e){
    e.preventDefault()       
    fetchFruitData(e.target[0].value) 
    e.target[0].value = ""
}

// we want to find the target value which has been submitted in this form - using array sq bracket notation - e.target[0].value - this grabs the value of the input when submit occurs

// now we have extracted the submission

const fruitNutrition = document.querySelector("#nutritionSection p")

function fetchFruitData(fruit){
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    .then(processResponse)
    .then(data => addFruit(data))
    .catch((err) =>console.log(err))
                              //we take data - need to convert from json back to js code 

}
function processResponse(resp){
    if(resp.ok){
        return resp.json()
    }
    else{
        throw "Error: http status code = "+ resp.status
    }
}


const fruitList = document.querySelector("#fruitSection ul")

let calories = 0; 
let fruitCal = {}

function addFruit(fruit){
    if(!fruit){
        console.log('Invalid Fruit')
    } else {
    const li = document.createElement("li"); // adds a new list item
    li.addEventListener("click", removeFruit, {once:true}) // option to remove  - //once:true makes sure the event listener doesnt wait around for it as the list item has been deleted
    li.textContent = fruit['name']  // li is set to fruit 
    fruitList.appendChild(li) // appends li inside ul 
    fruitCal[fruit.name] = fruit.nutritions.calories
    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories

    //for deleting calories along with the fruit 
    // -

}}


//every time addFruit is called, we add a new item to the unordered list which is the fruit which has been submitted

// ** add Fruit is then used with extracFruit to add the submitted fruit to the DOM/ List in HTML 

function removeFruit(e){
    const fruitName = e.target.textContent
    calories -= fruitCal[fruitName]
    fruitNutrition.textContent = calories

    delete fruitCal[fruitName]

    e.target.remove()
    
}


 
