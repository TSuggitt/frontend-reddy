const fruitform = document.querySelector("#inputSection form")

//when someone submits the form, we extract the fruit that they have submitted
fruitform.addEventListener("submit", extractFruit)


function extractFruit(e){
    e.preventDefault()       
    addFruit(e.target[0].value)
    e.target[0].value = ""
}

// we want to find the target value which has been submitted in this form - using array sq bracket notation - e.target[0].value - this grabs the value of the input when submit occurs

// now we have extracted the submission

const fruitList = document.querySelector("#fruitSection ul")

function addFruit(fruit){
    if(!fruit){
        console.log('Invalid Fruit')
    } else {
    const li = document.createElement("li");
    li.addEventListener("click", removeFruit, {once:true}) //creates new li+ option to remove  - //once:true makes sure the event listener doesnt wait around for it as the list item has been deleted
    li.textContent = fruit  // li is set to fruit 
    fruitList.appendChild(li) // appends li inside ul 
}}

//every time addFruit is called, we add a new item to the unordered list which is the fruit which has been submitted

// ** add Fruit is then used with extracFruit to add the submitted fruit to the DOM/ List in HTML 

function removeFruit(e){
    e.target.remove()
}
