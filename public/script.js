const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const name = place.name
    fetch('/weather', {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
    })
})

function setWeatherData(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name,icon,description,temp,humidity,speed)
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = Math.round(temp) + "° F";
    document.querySelector(".weather-type").innerText = description.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + Math.round(speed) + " mph";
}
// let weather = {
//     "apiKey": "f04d78e48cbdbcc5aff065cb5fd86d80",
//     fetchWeather: function (city) {
//         fetch(
//             "https://api.openweathermap.org/data/2.5/weather?q="
//             + city
//             + "&units=imperial&appid="
//             + this.apiKey
//             ).then((response) => response.json())
//             .then((data) => this.displayWeather(data));
//     },
//     displayWeather: function(data) {
        
//     }
// };
