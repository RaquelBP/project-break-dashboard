import {backgroundImg, pageEventListeners} from "../js/common.js"
const displayCityDom = document.getElementById("city-country")
const weatherConditionDom = document.getElementById("weather-condition")
const weatherIconDom = document.getElementById("weather-icon")
const degreesDom= document.getElementById("degrees")
const precipDom = document.getElementById("precip")
const humidityDom= document.getElementById("humidity")
const windDom= document.getElementById("wind")
const weatherDayDisplayDom = document.getElementById("weather-day-display")
const weatherCurrentDisplayDom= document.getElementById("weather-current-display")
const weatherInput= document.getElementById("weather-city-input")
const weatherPageDom = document.getElementById("weather-page")
const homeDom= document.getElementById("home")


if(homeDom){
    weatherPageDom.setAttribute("class", "active")
} else{
    weatherPageDom.setAttribute("class", "non-active")
}

pageEventListeners()
backgroundImg()
setInterval(backgroundImg, 15000)


//Revisa si Nombre existe en el localStorage
//Si no existe crealo con valor vacío  Nombre: ""
if (!localStorage.getItem("Ciudad")) {
    setCity("Madrid")
}
//Si existe pon el nombre en el Input para el nombre y ejecuta la función para que aparezca el nombre en el DOM
else {
    weatherInput.value = localStorage.getItem("Ciudad")
}

//Gestión del evento del input del nombre
//Variable de control para que no se ejecute dos veces el evento al hacer focusout cuando presionamos ENTER
let controlVarCity = true
const eventListeners= ["keypress", "focusout"]
eventListeners.forEach((event)=>{
    weatherInput.addEventListener(event, (keypressed)=>{
        if(controlVarCity && event==="keypress" && keypressed.key === "Enter" && weatherInput.value || controlVarCity && event==="focusout" && weatherInput.value){ //Si se pone un nuevo valor en el input del nombre, pasa ese nombre como nuevo valor al localStorage
            controlVarCity=false
            weatherInput.blur()
            setCity(weatherInput.value)
            city = localStorage.getItem("Ciudad")
            fetchApi(city)
        } else if(controlVarCity && event==="focusout" && !weatherInput.value || controlVarCity && event==="keypress" && keypressed.key === "Enter" && !weatherInput.value) { //Si el input del nombre está vacío (se elimina el nombre existente), borrar el valor de nombre del localStorage 
            controlVarCity=false
            setCity("Madrid")
            city = localStorage.getItem("Ciudad")
            fetchApi(city)
        }
        controlVarCity=true
    })
})

// (Re)asigna el valor name a Nombre en el localStorage
function setCity(city) {
    localStorage.setItem("Ciudad", city)
    weatherInput.value = localStorage.getItem("Ciudad")
    
}




const apiKey = "b96783f979fd4103848121457240304"
let city = localStorage.getItem("Ciudad")
fetchApi(city)


function fetchApi(city){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`)
    .then((response)=>{
        if(!response.ok){
            weatherDayDisplayDom.innerHTML="Error"
            weatherCurrentDisplayDom.style.visibility = "hidden";
            if(response.status===400){
                weatherDayDisplayDom.innerHTML="Ciudad no encontrada"
            }
            
            throw new Error("La solicitud no fue exitosa:", response.status)
        }
        return response.json()
    })
    .then((data)=>{
        weatherCurrentDisplayDom.style.visibility = "visible";
        //console.log(data)
        //console.log(arrangeData(data))
        displayData(arrangeData(data))

    })
}

function arrangeData(data){ 
    const currentData = {}
    currentData.city = data.location.name
    currentData.country = data.location.country
    currentData.localTime = data.location.localtime
    currentData.weatherCondition = data.current.condition.text
    currentData.weatherIcon = data.current.condition.icon
    currentData.degrees = data.current.temp_c
    currentData.precip = data.current.precip_mm
    currentData.humidity = data.current.humidity
    currentData.wind = data.current.wind_kph

    console.log(data.forecast.forecastday[0].hour)
    const dayData = {}

    for(let i=0; i<24; i++){
        let time = "time"+(i.toString().padStart(2, '0'))
        dayData[time] = {
            "icon": data.forecast.forecastday[0].hour[i].condition.icon,
            "temperature": data.forecast.forecastday[0].hour[i].temp_c
        }
    }

    const dataArray = [currentData, dayData]
    return dataArray
}

function displayData(dataArray){
    weatherDayDisplayDom.innerHTML=""
    
    const currentData = dataArray[0]

    displayCityDom.textContent=`${currentData.city}, ${currentData.country}`
    weatherConditionDom.textContent= currentData.weatherCondition
    weatherIconDom.setAttribute("src", currentData.weatherIcon)
    degreesDom.textContent= currentData.degrees+"º"
    precipDom.innerHTML= `<span>Precipitaciones:</span> ${currentData.precip}mm/h`
    humidityDom.innerHTML= `<span>Humedad:</span> ${currentData.humidity}%`
    windDom.innerHTML= `<span>Viento:</span> ${currentData.wind} Km/h`



    const dayData = dataArray[1]
    console.log(dayData)

    const weatherDayUl= document.createElement("ul")
    weatherDayUl.setAttribute("id", "weather-day-ul")
    weatherDayDisplayDom.appendChild(weatherDayUl)

    Object.entries(dayData).forEach((element, i) => {
        const iteration= i.toString().padStart(2, '0')

        const weatherDayLi= document.createElement("li")
        weatherDayUl.appendChild(weatherDayLi)
        const weatherDayPTime=document.createElement("p")
        weatherDayLi.appendChild(weatherDayPTime)

        weatherDayPTime.innerText= iteration+ ":00"

        const weatherDayImg=document.createElement("img")
        weatherDayLi.appendChild(weatherDayImg)
        weatherDayImg.setAttribute("src", dayData["time"+iteration].icon)

        const weatherDayTemp=document.createElement("p")
        weatherDayLi.appendChild(weatherDayTemp)
        weatherDayTemp.innerText=`${dayData["time"+iteration].temperature}º`

        
    });
    const weatherLi= document.getElementById("weather-day-ul").children
    checkCurrentTime(dataArray, weatherLi)
}



function checkCurrentTime(dataArray, weatherLi){
    //console.log("1")
    const localTime = dataArray[0].localTime.split(' ')[1].split(':')[0]
    //console.log("2")
    console.log(localTime)
    //console.log("3")
    weatherLi.item(localTime).classList.toggle("current")
    //console.log("4")
    return localTime
}
