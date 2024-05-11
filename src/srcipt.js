const Container = document.querySelector('.container');
const Search = document.querySelector('#Search-button');
const wheatherBox = document.querySelector('#wheather-box');
const wheatherDetails = document.querySelector('.whether-details');

Search.addEventListener ('click',() => {
    const APIKey= ''
    const city = document.querySelector('.Search-button input').value;

    if(city == '')
        return;

    fetch('https://api.openweathermap.org/data/2.5/weather?q= ${city}&units=metric&appid=${API key}')
    .then(response => response.json()).then(json => {

        const image = document.querySelector('.wheather-box img');
        const temperature = document.querySelector('.wheather-box .temperature');
        const description = document.querySelector('.wheather-box .description');
        const humidity = document.querySelector('.wheather-details .humidity span');
        const wind = document.querySelector('.wheather-details .wind span');
         
        switch (json.wheather[0].main) {
            case 'clear':
                image.src = 'img/clear.png';                
                break;

            case 'rain':
                image.src = 'img/rain.png';                
                break;  
            
            case 'Clouds':
                image.src = 'img/cloud.png';                
                break;  

            case 'Mist':
                image.src = 'img/Mist.png';                
                break;  

            case 'Haze':
                image.src = 'img/Mist.png';                
                break;  
              
        
            default:
              image .src="images/cloudy.webp"
        }

    });

});
