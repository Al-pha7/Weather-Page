const apikey = "3323adf9d1f1d730cbb272ce4bfa9e32";

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather;

    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${(temp - 273.15).toFixed(2)} °C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon">
    `;
    weatherDisplay.innerHTML = weatherHTML;
}
