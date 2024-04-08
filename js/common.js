function backgroundImg(){
    const randomNum= Math.floor(Math.random()*10)
    const imageUrl = `/img/background_0${randomNum}.jpg`;
    //Carga la imagen para evitar problemas con la transición entre imagenes
    const img = new Image()  //Crea un objeto imagen que hace que se cargue la imagen en el caché del navegador
    img.src = imageUrl   //Setea el src del objeto imagen que acabamos de crear con el url creado antes
    img.onload = () => {   //onload es un evento que hace que se ejecute el código de dentro una vez la imagen se ha cargado por completo 
        document.body.style.backgroundImage = `url("${imageUrl}")`
    }
}

function pageEventListeners(){
    if(document.getElementById("home")){
        document.getElementById("home").addEventListener("click", ()=>{
            window.open("/index.html", "_self")
        })
    }
    document.getElementById("digital-clock-page").addEventListener("click", ()=>{
        window.open("/digital-clock.html", "_self")
    })
    document.getElementById("key-generator-page").addEventListener("click", ()=>{
        window.open("/key-generator.html", "_self")
    })
    document.getElementById("list-page").addEventListener("click", ()=>{
        window.open("/list.html", "_self")
    })
    document.getElementById("weather-page").addEventListener("click", ()=>{
        window.open("/weather.html", "_self")
    })
}

export {backgroundImg, pageEventListeners}