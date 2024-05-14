// creating variables
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

// API key for OpenWeatherMap API
const API_KEY = "fd291cc03ab14b8582f5a89374af3d58";

// HTML for the main weather card
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { 
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                
                </div>`;
    } else { 
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });


        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";


        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response

    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}


const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; 
            // Getting city name from coordinates using  geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.permission_denied) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());













// const Container = document.querySelector('.container');


// const Search = document.querySelector('#Search-button');
// const wheatherBox = document.querySelector('.wheather-box');                                                                                    wheather-box');
// const wheatherDetails = document.querySelector('.whether-details');

// Search.addEventListener ('click',() => {
//     const APIKey= 'ecce0115d3116d1b0e9a9e6c7f7a8846'
//     const city = document.querySelector('.Search-button input').value;

//     if(city == '')
//         return;

//     fetch('https://api.openweathermap.org/data/2.5/weather?q= ${city}&units=metric&appid=${API key}')
//     .then(response => response.json()).then(json => {

//         const image = document.querySelector('.wheather-box img');
//         const temperature = document.querySelector('.wheather-box .temperature');
//         const description = document.querySelector('.wheather-box .description');
//         const humidity = document.querySelector('.wheather-details .humidity span');
//         const wind = document.querySelector('.wheather-details .wind span');
         
//         switch (json.wheather[0].main) {
//             case 'clear':
//                 image.src = 'img/clear.png';                
//                 break;

//             case 'rain':
//                 image.src = 'img/rain.png';                
//                 break;  
            
//             case 'Clouds':
//                 image.src = 'img/cloud.png';                
//                 break;  

//             case 'Mist':
//                 image.src = 'img/Mist.png';                
//                 break;  

//             case 'Haze':
//                 image.src = 'img/Mist.png';                
//                 break;  
              
        
//             default:
//               image .src="images/cloudy.webp"
//         }

//     });

// });
