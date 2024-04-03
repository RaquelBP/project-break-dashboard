import {backgroundImg, pageEventListeners} from "../js/common.js"

//const bodyDom = document.body
//const clockPageDom = document.getElementById("digital-clock-page")

const nameInput = document.getElementById("name-input")
const dashboardH1 = document.getElementById("dashboard-h1")

pageEventListeners()
backgroundImg()
setInterval(backgroundImg, 15000)




//Revisa si Nombre existe en el localStorage
//Si no existe crealo con valor vacío  Nombre: ""
if (!localStorage.getItem("Nombre")) {
    setName("")
}
//Si existe pon el nombre en el Input para el nombre y ejecuta la función para que aparezca el nombre en el DOM
else {
    nameInput.value = localStorage.getItem("Nombre")
    displayName(localStorage.getItem("Nombre"))
}

//Gestión del evento del input del nombre
//Variable de control para que no se ejecute dos veces el evento al hacer focusout cuando presionamos ENTER
let controlVar = true
const eventListeners= ["keypress", "focusout"]
eventListeners.forEach((event)=>{
    nameInput.addEventListener(event, (keypressed)=>{
        if(controlVar && event==="keypress" && keypressed.key === "Enter" && nameInput.value || controlVar && event==="focusout" && nameInput.value){ //Si se pone un nuevo valor en el input del nombre, pasa ese nombre como nuevo valor al localStorage
            controlVar=false
            nameInput.blur()
            setName(nameInput.value)
        } else if(controlVar && event==="focusout" && !nameInput.value || controlVar && event==="keypress" && keypressed.key === "Enter" && !nameInput.value) { //Si el input del nombre está vacío (se elimina el nombre existente), borrar el valor de nombre del localStorage 
            controlVar=false
            localStorage.removeItem("Nombre")
            displayName()
        }
        controlVar=true
    })
})

// (Re)asigna el valor name a Nombre en el localStorage
function setName(name) {
    localStorage.setItem("Nombre", name)
    displayName()
}

function displayName() {
    if(localStorage.getItem("Nombre")){
        dashboardH1.innerText = `Dashboard de ${localStorage.getItem("Nombre")}`
    } else {
        dashboardH1.innerText = `Dashboard`
    }
}