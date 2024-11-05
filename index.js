const apiKey = "061b1404b33bd543b2e6048dbbca97b0"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

let weatherIcon = document.querySelector(".weather-icon")
const  now = new Date()
const hours = String(now.getHours())
const minutes = String(now.getMinutes())
const seconds = String(now.getSeconds())
const currentTime = `${hours}:${minutes}:${seconds}`

const year = now.getFullYear()
const month = String(now.getMonth() + 1)
const day = String(now.getDate())
const currentDate = `${day}-${month}-${year}`

async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr"
    if (data.weather[0].main == "Snow") {
        weatherIcon.src="images/snow.png"
        document.querySelector(".card").style.backgroundImage = "url(./images/tom-snow.jpg)"
    }else if (data.weather[0].main=="Clouds") {
        weatherIcon.src="images/clouds.png"
        document.querySelector(".card").style.backgroundImage = "url(./gif/sky-4583_256.gif)"
    }else if (data.weather[0].main=="Drizzle") {
        weatherIcon.src="images/drizzle.png"
        document.querySelector(".card").style.backgroundImage = "url(./gif/drizzle.gif)"
    }else if (data.weather[0].main=="Humidity") {
        weatherIcon.src="images/humidity.png"
    }else if (data.weather[0].main=="Mist") {
        weatherIcon.src="images/mist.png" 
    }else if (data.weather[0].main=="Rain") {
        weatherIcon.src="images/rain.png"
        document.querySelector(".card").style.backgroundImage = "url(./images/doraemon-rain (1).jpg)"
    }else{
        weatherIcon.src="images/haze.png" 
         document.querySelector(".card").style.backgroundImage = "url(./images/haze-bg.jpg)"
    }
    document.querySelector(".weather").style.display = "block"

    document.querySelector(".date").innerHTML = currentDate
    document.querySelector(".time").innerHTML = currentTime
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

searchBox.addEventListener("keydown", (event) =>{
    if (event.key==="Enter"){
        checkWeather(searchBox.value)
    }
})