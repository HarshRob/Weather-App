const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const name = place.name
    const units = document.getElementById("units").checked ? "metric" : "imperial"
    
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
    document.querySelector(".temp").innerText = document.getElementById("units").checked ? Math.round(temp) + "°C" : Math.round(temp) + "°F";
    document.querySelector(".weather-type").innerText = description
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = document.getElementById("units").checked ? "Wind Speed: " + Math.round(speed) + " m/s" : "Wind Speed: " + Math.round(speed) + " mph";
}

function search() {
    setWeatherData(document.querySelector(".search-bar").value, place.formatted_address);
}

document.querySelector(".search button").addEventListener("click", function() {
    search();
})


