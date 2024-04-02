function backgroundImg(){
    const randomNum= Math.floor(Math.random()*10)
    const imageUrl = `/img/background_0${randomNum}.jpg`;
    document.body.style.backgroundImage = `url("${imageUrl}")`;
}

export {backgroundImg}