import {backgroundImg, pageEventListeners} from "../js/common.js"
const buttonDom= document.getElementById("generate")
const inputNumberDom= document.getElementById("inputNumber")
const displayPasswordDom= document.getElementById("display-password")
const keyGeneratorPageDom = document.getElementById("key-generator-page")
const homeDom= document.getElementById("home")


if(homeDom){
    keyGeneratorPageDom.setAttribute("class", "active")
} else{
    keyGeneratorPageDom.setAttribute("class", "non-active")
}

pageEventListeners()
backgroundImg()
setInterval(backgroundImg, 15000)


//Declara como el valor de la variable input, lo que vale el input del usuario
let input= Number(inputNumberDom.value)
//Actualiza el valor del input dependiendo de la selección del usuario
inputNumberDom.addEventListener("focusout", ()=>{
    input= Number(inputNumberDom.value)
    if(!input || typeof input !== "number" || input < 12){
        console.log("Error A")
        console.log(input)
        inputNumberDom.value=12
        input = Number(inputNumberDom.value)
        console.log(input)
    } else if (input>50){
        inputNumberDom.value=50
        input = Number(inputNumberDom.value)
    }
})
//Lanza la función que genera la contraseña dependiendo del input del usuario y ponla en el DOM
buttonDom.addEventListener("click", ()=>{
    if(!input || typeof input !== "number"){
        console.log("Error B")
        console.log(input)
    } else{
    displayPassword(generator(input))
    }
})


function generator(input){
    //Declara los elementos posibles para utilizar en la contraseña
    const passwordElements= ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "!@#$%^&*()-_=+"]
    //Pon en una variable cada tipo de elemento
    const[mayusculas, minusculas, numeros, simbolos] = passwordElements
    //Array vacío que contendrá la nueva contraseña
    let password= []

    //Saca tantos elementos aleatorios como haya seleccionado el usuario pero saca 4 menos (que serán los obligatorios) para añadirlos más tarde y asegurarnos de que están
    for(let i = 0; i<input-4; i++){
        //Selecciona un número del 0 al 3, es decir, seleciona uno de los 4 elementos (mayus, minus, num, simbol) que determinará de qué elemento será el caracter de esta iteración
        const randomType= Math.floor(Math.random()*4)
        //Selecciona un número aleatorio con valor mínimo 0 y máximo la longitud del tipo de elemento que ha tocado con la función random()
        const randomCharIndex= random(passwordElements[randomType])
        //Consigue el caracter que coincide con el index que ha tocado
        const passwordItem= passwordElements[randomType].charAt(randomCharIndex)
        //Añade el caracter a la contraseña
        password.push(passwordItem)
        
    }
    //Genera un elemento aleatorio de cada tipo (el mínimo obligatorio)
    password= neededElements(password, mayusculas)
    password= neededElements(password, minusculas)
    password= neededElements(password, numeros)
    password= neededElements(password, simbolos)

    //Une la contraseña final en un string
    password= password.join("")
    return password
}

//Genera un número aleatorio de valor mínimo 0 y de valor máximo la longitud del elemento pasado como parámetro
function random(element){
    //console.log("Longitud:",element.length)
    const randomNum= Math.floor(Math.random()*(element.length))
    //console.log("Random:", randomNum)
    return randomNum
}

//Genera los caracteres mínimos obligatorios
function neededElements(password, element){
    //Genera un index random dependiendo de la longitud de la contraseña en donde irá el nuevo caracter
    const index= random(password+1)
    //Genera un caracter random dependiendo del elemento
    const newCharacter= element.charAt(random(element))
    //Añade el nuevo caracter a la posición generada con  .splice(insertAtIndex, deleteCount, elementToAdd)
    password.splice(index, 0, newCharacter)
    return password
}

function displayPassword(password){
    displayPasswordDom.innerHTML=password
}