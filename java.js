const apiKey = 'LKV52KQUBXVCWFAWD968K2K4G';
const unitGroup = 'metric';
const contentType = 'json';

function processWeatherData(data) {
    const weatherinfo = {
        temp: data.days[0].temp,
        conditions: data.days[0].conditions
    };
    return weatherinfo;     
}



function displayWeather(weatherinfo) {
    const weatherDisplay = document.getElementById('weatherResult');
    weatherDisplay.innerHTML = `Temperature: ${weatherinfo.temp}°C<br>Conditions: ${weatherinfo.conditions}`;
}



async function getWeather(city) {
    
    try {
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${apiKey}&contentType=${contentType}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data = await response.json();      
        const weatherinfo = processWeatherData(data);
        displayWeather(weatherinfo);

        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


const getWeatherButton = document.getElementById('getWeatherBtn');

getWeatherButton.addEventListener('click', function() {
    const cityinputEl = document.getElementById('cityInput');
    const city = cityinputEl.value;
    if (city) {
        getWeather(city);
        cityinputEl.value = '';
        const wait = document.getElementById('weatherResult');
        wait.innerHTML = 'Loading...';
    } else {
        alert('Please enter a city name.');
    }
});






