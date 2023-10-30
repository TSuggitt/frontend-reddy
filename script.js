
const fruitForm = document.querySelector("#inputSection form")
fruitForm.addEventListener("submit", extractFruit)

function extractFruit(e) {
  e.preventDefault()
  fetchFruitData(e.target[0].value)
  e.target[0].value = ""
}

// function fetchFruitData(fruit){
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(processResponse)
//         .then(data => addFruit(data))
//         .catch(err => console.log(err))
// }

const fetchFruitData = async (fruit) => {
  try {
    const response = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
    const fruityResponse = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=40368210-c161c470fcd7ab17a35a38235`)
    console.log(fruityResponse)
    if (response.ok && fruityResponse.ok) {
      const data = await response.json()
      const { hits } = await fruityResponse.json()
      console.log(hits)
      addFruit(data, hits)
    } else {
      throw "Error: http status code = " + response.status
    }
  } catch (err) {
    console.log(err)
  }
}

const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

let calories = 0
const fruitCal = {}

function addFruit(fruit, imageObj) {
  if (!fruit || !imageObj) {
    console.log("Invalid fruit")
  } else {
    const li = document.createElement("li")
    const img = document.createElement("img")
    li.addEventListener("click", removeFruit, { once: true })
    li.textContent = fruit["name"]
    img.setAttribute("src", imageObj[0].previewURL)
    li.appendChild(img)
    fruitList.appendChild(li)



    fruitCal[fruit.name] = fruit.nutritions.calories

    calories += fruit.nutritions.calories
    fruitNutrition.textContent = calories
  }
}

function removeFruit(e) {
  const fruitName = e.target.textContent
  calories -= fruitCal[fruitName]
  fruitNutrition.textContent = calories

  delete fruitCal[fruitName]

  e.target.remove()
}
