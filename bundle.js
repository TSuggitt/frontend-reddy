(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

/*function fetchFruitData(fruit){
    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    .then(processResponse)
    .then(data => addFruit(data))
    .catch((err) =>console.log(err))
                              //we take data - need to convert from json back to js code 

}*/

let imageObj ={}

async function fetchFruitData(fruit){
    try{
        const response = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
        const fruityresponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=40368210-c161c470fcd7ab17a35a38235`)
        if(response.ok){
            const data = await response.json()
            const { hits } = await fruityresponse.json()
            addFruit(data, hits)
        }else{
            throw "Error: http status code = " + response.status
        }

    } catch(error){
        console.log(error)
    }

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

function addFruit(fruit, hits){
    if(!fruit || imageObj){
        console.log('Invalid Fruit')
    } else {
    const li = document.createElement("li");
    const img = document.createElement("img") // adds a new list item
    li.addEventListener("click", removeFruit, {once:true}) // option to remove  - //once:true makes sure the event listener doesnt wait around for it as the list item has been deleted
    li.textContent = fruit['name']  // li is set to fruit 
    fruitList.appendChild(li)
    img.setAttribute("src", imageObj[0].previewURL) 
    li.appendChild(img)// appends li inside ul 
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


 

},{}]},{},[1]);
