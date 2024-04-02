const clockDom= document.getElementById("clock")
const dateDom= document.getElementById("date")
const fraseDom= document.getElementById("frase")


//Ejecuta primero las funcines para que no tarde 1 segundo en aparecer
display()
backgroundImg()
//Actualiza cada X segundos
setInterval(display, 1000)
setInterval(backgroundImg, 15000)


function date(){
    //Consigue la fecha actual
    const date = new Date()
    //De la fecha actual, saca las horas, minutos, segundos, día, mes y año por separado
    const hours = date.getHours()
    //Pasa el valor concreto de la fecha a la función que le pone el formato necesario y repite para cada elemento
    const hoursFormated = dateFormating(hours)
    const minutes = date.getMinutes()
    const minutesFormated = dateFormating(minutes)
    const seconds = date.getSeconds()
    const secondsFormated = dateFormating(seconds)
    
    const day = date.getDay()
    const dayFormated = dateFormating(day)
    const month = date.getMonth()
    const monthFormated = dateFormating(month)
    const year = date.getFullYear()
    const yearFormated = dateFormating(year)

    const dateObject= {
        hours: hoursFormated,
        minutes: minutesFormated,
        seconds: secondsFormated,
        day: dayFormated,
        month: monthFormated,
        year: yearFormated
    }
    return dateObject
}

function display(){
    //Ponlo visible en el DOM
    clockDom.innerText = `${date().hours}:${date().minutes}:${date().seconds}`
    dateDom.innerText = `${date().day}/${date().month}/${date().year}`
    fraseDom.innerText = `${frases(date().hours, date().minutes)}`
}

function dateFormating(element){
    if(element<10){
        const newElement= "0"+element
        return newElement
    }
    return element
}

function frases(hour, minute){
    let frase = ""
    if(hour >= 0 && hour < 7){
        frase="Es hora de descansar"
    }
    else if(hour >= 7 && hour < 12){
        frase="¡Buenos días!"
    }
    else if(hour >= 12 && hour < 14){
        frase="Se acerca la hora de comer"
    }
    else if(hour >= 14 && hour < 16){
        frase="Que tengas un buen comienzo de tarde"
    }
    else if(hour >= 16 && hour < 18){
        frase="¡Buenas tardes!"
    }
    else if(hour >= 18 && hour < 22){
        frase="Se acerca la hora de cenar"
    }
    else if(hour >= 22 && hour <= 23 && minute <= 59){
        frase="¡Buenas noches!"
    }
    return frase
}

function backgroundImg(){
    const randomNum= Math.floor(Math.random()*10)
    const imageUrl = `/img/background_0${randomNum}.jpg`;
    document.body.style.backgroundImage = `url("${imageUrl}")`;
}
