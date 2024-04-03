function backgroundImg(){
    const randomNum= Math.floor(Math.random()*10)
    const imageUrl = `/img/background_0${randomNum}.jpg`;
    document.body.style.backgroundImage = `url("${imageUrl}")`;
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