import {backgroundImg, pageEventListeners} from "../js/common.js"
const titleInputDom= document.getElementById("title-input")
const linkInputDom= document.getElementById("link-input")
const botonLinkDom= document.getElementById("boton-link")
const displayLinkDom= document.getElementById("display-link")
const validLinkDom= document.getElementById("valid-link")

pageEventListeners()
backgroundImg()
setInterval(backgroundImg, 15000)

let linkList= getLinksLocalStorage()
displayLink(linkList)
console.log(linkList)



//Declara como el valor de la variable input, lo que vale el input del usuario
let titleInput= titleInputDom.value
let linkInput= linkInputDom.value

//Actualiza el valor del input dependiendo de la selección del usuario
titleInputDom.addEventListener("focusout", ()=>{
    titleInput= titleInputDom.value
})
//Actualiza el valor del input dependiendo de la selección del usuario, limpia el display de errores de URL no válido en caso de que le haya saltado el error anteriormente al usuario. Checkea si el valor de input existe y si contiene el . (para que detecte por ejemplo .com o .es). Si es válida checkea si tiene protocolo ("/"), si no, le añade "https://" al link. Si no es válida la URL saltará un error en el display
linkInputDom.addEventListener("focusout", ()=>{
    linkInput= linkInputDom.value
    validLinkDom.innerText=""
    if(linkInput && linkInput.includes(".")){
        if(!linkInput.includes("/")){
        linkInput= "https://" + linkInputDom.value
    }} else if(linkInput) {
        linkInput= ""
        validLinkDom.innerText="URL no válida, por favor, revísela"
        console.log("URL no válida")
    }
})

//Lanza la función que genera la contraseña dependiendo del input del usuario y ponla en el DOM
botonLinkDom.addEventListener("click", ()=>{
    if(titleInput&&linkInput){
        //console.log(titleInput, linkInput)
        manageLinks(titleInput, linkInput)
        displayLink(linkList)
        
    }
})

function manageLinks(titleInput, linkInput){
    const controlArray = []

    controlArray.push(titleInput)
    controlArray.push(linkInput)

    linkList.push(controlArray)

    saveLinksLocalStorage()
    console.log(linkList)
    return linkList
}

function displayLink(linkList){
    displayLinkDom.innerHTML=""
    
    const linksUl = document.createElement("ul")
    displayLinkDom.appendChild(linksUl)

    linkList.forEach((element, i) => {
        const keysLink= element[0]
        const valuesLink= element[1]
        const linksLi = document.createElement("li")
        
        linksUl.appendChild(linksLi)
        const linksA= document.createElement("a")
        linksA.innerText=keysLink
        linksLi.appendChild(linksA)
        linksA.setAttribute("href", valuesLink)

        //Create Delete Button
        const deleteButton= document.createElement("button")
        const btnId= i
        deleteButton.setAttribute("id", "deleteBtn-"+btnId)
        deleteButton.textContent="Eliminar"
        linksLi.appendChild(deleteButton)

        //Delete Button Event Listener
        deleteButton.addEventListener("click", (event)=>{
            const clickedBtn= event.target.closest("button").id
            const clickedBtnId= clickedBtn.split("-")[1].trim()

            linkList.splice(clickedBtnId, 1)
            saveLinksLocalStorage()
            displayLink(linkList)

            console.log(linkList)

            console.log(clickedBtnId)        
        })
    })
}


function getLinksLocalStorage(){
    const links = JSON.parse(localStorage.getItem("Links"))
    return links ? links : []
}
function saveLinksLocalStorage(){
    localStorage.setItem("Links", JSON.stringify(linkList))
}