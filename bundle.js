(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const fruitForm = document.querySelector("#inputSection form")
// this assigns the form within the input section to the variable 'fruitForm'
fruitForm.addEventListener("submit", extractFruit)
// this is an event listener - so when the submit button is hit, the extractFruit function will exectute


// this is a function which: 
function extractFruit(e) {
  e.preventDefault() // this prevents the form from submitting and refreshing the page
  fetchFruitData(e.target[0].value) // this returns the API element - then it returns its attributes, then it returns the first attribute and the value stored in the value key - in this case the name of the fruit.
  e.target[0].value = ""
}


// function fetchFruitData(fruit){
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(processResponse)
//         .then(data => addFruit(data))
//         .catch(err => console.log(err))
// }

const fetchFruitData = async (fruit) => {
  try { // code in the try block is executed first/ "tried first"
    const response = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    // this fetches the value of a fruit from the fruity api 
    const fruityResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=40368210-c161c470fcd7ab17a35a38235`)
    // this fetches an image of a fruit from the pixaby API 
    console.log(response)
    console.log(fruityResponse)
    if (response.ok && fruityResponse.ok)
    /*if the value of the API request is 'ok' we then proceed with the following*/ {
      const data = await response.json() // this is an asynchronous response that takes JSON as an input and parses it to produce a JS object
      const { hits } = await fruityResponse.json()
      console.log(hits)
      addFruit(data, hits) // if we have an ok reponse and we get the data back from the API, and convert it to JS form, we execute the addFruit function which takes the fruit and the image and will display it 
    } else {
      throw "Error: http status code = " + response.status
    } // if we have an issue with communication where the response is okay, i.e the value of the key 'ok' is 'true', we return a http status code which tells us what the issue could be 
  } catch (err) {
    console.log(err)
  } // if the code in the try block throws an exception, code in the catch block is executed and in this case an error is returned.
}

const fruitList = document.querySelector("#fruitSection ul")
// this is a querySelector which assigns the variable fruitList to the unordered list in the fruit section 
const fruitNutrition = document.querySelector("#nutritionSection p")
// this is a querySelector which assigns the variable fruitNutrition to the paragraph(tag) in the nutrition section 

let calories = 0 // this gives the accumulation of calories as we add each fruit to our list 
const fruitCal = {} // we create an empty object which will store key-value pairs as 
// 'fruit' : calories

function addFruit(fruit, imageObj) {
  if (!fruit || !imageObj) {
    console.log("Invalid fruit")
    // if a fruit is requested that does not exist in the fruity API, or an image is requested that does not exist in the pixaby API, the console will log a message letting us know that that is the case
  } else {// if the image/fruit is valid: 
    const li = document.createElement("li") // we create a list item
    const img = document.createElement("img")// we create an image 

    li.addEventListener("click", removeFruit, { once: true })
    // when the given list item is clicked, removeFruit is invoked and the list item is removed, along with the calories and its image
    li.textContent = fruit["name"] 
    // given a correct request, the list item when it is produced will be set to the name property of the fruit in the fruity API 
    img.setAttribute("src", imageObj[0].previewURL)
    // the image will be assigned as source value which is equal to the 
    // preview URL of the image object where the image object is the 'hits' value of the repsonse from the pixaby API - the hits are the search results - so this is assigning the image source as the URL of the first image that appears in the search request.

    li.appendChild(img)
    // this assigns the image of a fruit as the child element of the given fruit in the unordered list 
    
    fruitList.appendChild(li)
    // this adds the li as a child element to the unordered fruit list 



    fruitCal[fruit.name] = fruit.nutritions.calories
    // this adds each key-value "fruit":calories to the fruitCal object when each
    // fruit is added to the list 

    calories += fruit.nutritions.calories
    // as each fruit is added to the list, their corresponding calories are added to the total calorie count
    fruitNutrition.textContent = calories
    // this assigns the calorie counter as the new total for the calories of the fruits added

  }
}

// this is triggered when the event of clicking on a given fruit in the list occurs
function removeFruit(e) {
  const fruitName = e.target.textContent // fruitname is assigned as the fruit's 
  // text -content- i.e the text in the li it is stored in 
  calories -= fruitCal[fruitName] // this removes the calories stored by the given fruit from the calorie count as the fruit is removed from the list
  fruitNutrition.textContent = calories // this updates the list show on the HTML page


  delete fruitCal[fruitName] //this deletes the key-value pair from the fruit cal object

  e.target.remove() // this removes the fruit from the list once the fruit has been clicked. 
}

},{}]},{},[1]);
