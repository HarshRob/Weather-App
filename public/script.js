const searchElement = document.querySelector('[data-city-search]')
const options = {types: ['(cities)']}
const autoComplete = new google.maps.places.Autocomplete(searchElement, options)

function search() {
    const name = document.querySelector(".search-bar").value
    const units = document.getElementById("units").checked ? "metric" : "imperial"
    if(name == "") return
    fetch('/weather', {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            units: units
        })
    }).then(res => res.json()).then((data) => {
        setWeatherData(data)
    })
}

function setWeatherData(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = document.getElementById("units").checked ? Math.round(temp) + "°C" : Math.round(temp) + "°F";
    document.querySelector(".weather-type").innerText = description
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = document.getElementById("units").checked ? "Wind Speed: " + Math.round(speed) + " m/s" : "Wind Speed: " + Math.round(speed) + " mph";
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
}

document.querySelector(".search button").addEventListener("click", function() {
    search()
})

document.querySelector(".search-bar").addEventListener("keyup", function(e) {
    if(e.key == "Enter") {
        search()
    }
})

document.getElementById("units").addEventListener("click", function() {
    search()
})


