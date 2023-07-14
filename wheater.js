//Target the input 
let SearchCity = document.querySelector("#location-input")
//get cyrrent date
let date = new Date()
let dd = date.getDate()
let mm = date.getMonth() + 1
let yyyy = date.getFullYear()
console.log(date.getMonth())
//its use for get current time localstring formet
let time= new Date(date.getTime()).toLocaleTimeString()
//browser full loaded then ready function run
$(document).ready(()=>{
    //addEventlistener for get btn
    $("#btn").on("click",()=>{
        if(SearchCity.value !== ""){
            //show weather data container
            $(".display-content").show()
            //get request using user given the input city name
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${SearchCity.value}&appid=2c6823df05f8bb675e7f4e01e7870081`)
            .then(res=>res.json())
            .then(weatherData=>{
                console.log(weatherData)
                //Call the GeneratingData for rendering datas
                GeneratingData(weatherData)
            }).catch((error)=>console.log(error))
            //request completed non the input value
            SearchCity.value = ""
        }
        else{
            //user not given empty then show alert message
            alert("Please enter the City Name")
        }
    })
    //its function use get current location then this well show weather dat
    $("#get-location").on("click",()=>{
        $(".display-content").show()
        console.log(navigator.geolocation.getCurrentPosition)
        navigator.geolocation.getCurrentPosition((currentLocation)=>{
            console.log(currentLocation)
            let latitude = currentLocation.coords.latitude
            let longitude = currentLocation.coords.longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2c6823df05f8bb675e7f4e01e7870081`)
            .then(res=>res.json())
            .then(weatherData=>{
                // console.log(weatherData)

                //Call the GeneratingData for rendering data
                GeneratingData(weatherData)
            }).catch((error)=>console.log(error))
        })
    })

})

//this function successfully run api then get data the i will show ui
function GeneratingData(weatherData){
    let Sunrice = new Date(weatherData.sys.sunrise).toLocaleTimeString()
    let Sunset = new Date(weatherData.sys.sunset).toLocaleTimeString();
    $(".sunrice").text(`Sunrise⇒${Sunrice}`)
    $(".sunset").text(`Sunset⇒${Sunset}`)
    $(".date").text(`Date⇒${dd}/${mm}/${yyyy}`)
    $(".time").text(`Time⇒${time}`)
   let temperature = `${Math.floor((weatherData.main.feels_like)-273)}`
   $("#temp-dummy").text(temperature)
   $("#weather-status").text(`Climate⇒${weatherData.weather[0].description}`)
   $("#location-city").text(`City⇒${weatherData.name}`)
   $("#icon").attr("src",`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`)
}
