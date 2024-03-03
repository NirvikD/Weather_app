// Define options for the fetch request
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '07ce1efb32msh86389addcc88be4p167d92jsn545fce1f69de',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

// Function to fetch weather data for a specific city and update the weather card
const getWeatherAndUpdateCard = (city) => {
    return fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid city input');
            }
            return response.json();
        })
        .then(response => {
            // Update weather card with fetched data
            document.getElementById('cityName').textContent = city;
            document.getElementById('temp').textContent = response.temp;
            document.getElementById('wind_speed').textContent = response.wind_speed;
            document.getElementById('humidity').textContent = response.humidity;
            document.getElementById('cloud_pct2').textContent = response.cloud_pct;
            document.getElementById('min_temp').textContent = response.min_temp;
            document.getElementById('max_temp').textContent = response.max_temp;
            document.getElementById('wind_degrees').textContent = response.wind_degrees;
            document.getElementById('sunrise').textContent = new Date(response.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
            document.getElementById('sunset').textContent = new Date(response.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
        })
        .catch(err => {
            console.error(err);
            // Display popup message for invalid city input
            alert('Invalid city input. Please enter a valid city.');
        });
};

// Function to populate the table with weather data for multiple cities
const populateTable = (cities) => {
    const weatherDataPromises = cities.map(city => {
        return fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data for ' + city);
                }
                return response.json();
            });
    });

    Promise.all(weatherDataPromises)
        .then(weatherDataList => {
            weatherDataList.forEach((response, index) => {
                const city = cities[index];
                const tableRow = `
                    <tr>
                        <td>${city}</td>
                        <td>${response.temp}</td>
                        <td>${response.wind_speed}</td>
                        <td>${response.humidity}</td>
                        <td>${response.cloud_pct}</td>
                    </tr>
                `;
                document.getElementById('weather-data-body').insertAdjacentHTML('beforeend', tableRow);
            });
        })
        .catch(err => {
            console.error(err);
        });
};

// Event listener for the submit button
document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(e) {
        e.preventDefault(); 
        const cityInput = document.getElementById("cityInput").value; 
        getWeatherAndUpdateCard(cityInput);
    });
});

// Initial weather card update with default city (Kolkata)
getWeatherAndUpdateCard("Kolkata");

// Default population of table with example cities
const cities = [
    "Shanghai", 
    "New York", 
    "Tokyo", 
    "London", 
    "Mumbai", 
    "Paris", 
    "Los Angeles", 
    "Beijing", 
    "Moscow", 
    "Istanbul", 
    "Dubai", 
    "Rio de Janeiro", 
    "Sydney", 
    "Rome", 
    "Bangkok"
];

populateTable(cities);
