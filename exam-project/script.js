document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = 'api key must be here';
    const defaultCity = 'Kyiv';
    const todayTab = document.getElementById('today-tab');
    const fiveDayTab = document.getElementById('five-day-tab');
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const content = document.getElementById('content');
    let selectedDayIndex = 0; // Index of the selected day in 5-day forecast
    let currentCityData; // To store current city data

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            currentCityData = data;
            displayTodayWeather(data);
            // displayHourlyForecast(data.coord.lat, data.coord.lon);
            displayNearbyCities(data.coord.lat, data.coord.lon);
            if (fiveDayTab.classList.contains('active')) {
                displayFiveDayForecast(data.name, data.coord.lat, data.coord.lon);
            }
        } catch (error) {
            displayError(error.message);
        }
    };

    const displayTodayWeather = (data) => {
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const dayLength = new Date((data.sys.sunset - data.sys.sunrise) * 1000).toISOString().substr(11, 8);

        const currentWeatherHTML = `
            <div class="weather-today">
                <h2>${data.name}</h2>
                <p>${new Date().toLocaleDateString()}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                <p>${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Feels like: ${data.main.feels_like}°C</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
                <p>Day length: ${dayLength}</p>
            </div>
        `;
        content.innerHTML = currentWeatherHTML;
    };

    // const displayHourlyForecast = async (lat, lon) => {
    //     try {
    //         const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric`);
    //         if (!response.ok) {
    //             throw new Error('Hourly forecast data not available');
    //         }
    //         const data = await response.json();
    //         const hourlyForecast = data.hourly.slice(1, 7); // Displaying next 6 hours
    //         let hourlyForecastHTML = '<div class="hourly-forecast"><h2>Hourly Forecast</h2>';
    //         hourlyForecast.forEach(hour => {
    //             const hourTime = new Date(hour.dt * 1000).toLocaleTimeString();
    //             hourlyForecastHTML += `
    //                 <div class="hourly-forecast-item">
    //                     <p>${hourTime}</p>
    //                     <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="${hour.weather[0].description}">
    //                     <p>${hour.weather[0].description}</p>
    //                     <p>Temperature: ${hour.temp}°C</p>
    //                     <p>Feels like: ${hour.feels_like}°C</p>
    //                     <p>Wind: ${hour.wind_speed} m/s ${hour.wind_deg}°</p>
    //                 </div>
    //             `;
    //         });
    //         hourlyForecastHTML += '</div>';
    //         if (todayTab.classList.contains('active')) {
    //             content.innerHTML += hourlyForecastHTML;
    //         }
    //     } catch (error) {
    //         displayError(error.message);
    //     }
    // };

    const displayNearbyCities = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Nearby cities data not available');
            }
            const data = await response.json();
            let nearbyCitiesHTML = '<div class="nearby-cities"><h2>Nearby Cities</h2>';
            data.list.forEach(city => {
                nearbyCitiesHTML += `
                    <div class="nearby-city">
                        <h3>${city.name}</h3>
                        <img src="http://openweathermap.org/img/wn/${city.weather[0].icon}.png" alt="${city.weather[0].description}">
                        <p>Temperature: ${city.main.temp}°C</p>
                    </div>
                `;
            });
            nearbyCitiesHTML += '</div>';
            content.innerHTML += nearbyCitiesHTML;
        } catch (error) {
            displayError(error.message);
        }
    };

    const displayFiveDayForecast = async (cityName, lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('5-day forecast data not available');
            }
            const data = await response.json();
            const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Taking forecast for 12:00 PM
            let fiveDayForecastHTML = `<div class="five-day-forecast"><h2>5-day Forecast for ${cityName}</h2>`;
            dailyForecast.forEach((day, index) => {
                const date = new Date(day.dt * 1000);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                fiveDayForecastHTML += `
                    <div class="daily-forecast-item" id="day-${index}" data-date="${date}">
                        <hr>
                        <p>${dayOfWeek}</p>
                        <p>${date.toLocaleDateString()}</p>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                        <p>Temperature: ${day.main.temp}°C</p>
                        <p>${day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1)}</p>
                    </div>
                `;
            });
            fiveDayForecastHTML += '</div>';
            content.innerHTML = fiveDayForecastHTML;

            // Add event listeners to each daily forecast item
            const dailyForecastItems = document.querySelectorAll('.daily-forecast-item');
            dailyForecastItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    selectDay(index);
                });
            });

            // Display forecast for the default selected day (current day)
            selectDay(selectedDayIndex);
        } catch (error) {
            displayError(error.message);
        }
    };

    // const displayHourlyForecastForDay = async (date) => {
    //     try {
    //         const timestamp = date.getTime() / 1000;
    //         const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${currentCityData.coord.lat}&lon=${currentCityData.coord.lon}&dt=${timestamp}&appid=${API_KEY}&units=metric`);
    //         if (!response.ok) {
    //             throw new Error('Hourly forecast data for selected day not available');
    //         }
    //         const data = await response.json();
    //         const hourlyForecast = data.hourly.slice(0, 6); // Displaying next 6 hours from selected time
    //         let hourlyForecastHTML = '<div class="hourly-forecast"><h2>Hourly Forecast for Selected Day</h2>';
    //         hourlyForecast.forEach(hour => {
    //             const hourTime = new Date(hour.dt * 1000).toLocaleTimeString();
    //             hourlyForecastHTML += `
    //                 <div class="hourly-forecast-item">
    //                     <p>${hourTime}</p>
    //                     <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}.png" alt="${hour.weather[0].description}">
    //                     <p>${hour.weather[0].description}</p>
    //                     <p>Temperature: ${hour.temp}°C</p>
    //                     <p>Feels like: ${hour.feels_like}°C</p>
    //                     <p>Wind: ${hour.wind_speed} m/s ${hour.wind_deg}°</p>
    //                 </div>
    //             `;
    //         });
    //         hourlyForecastHTML += '</div>';
    //         content.innerHTML += hourlyForecastHTML;
    //     } catch (error) {
    //         displayError(error.message);
    //     }
    // };

    const selectDay = (index) => {
        selectedDayIndex = index;
        const dailyForecastItems = document.querySelectorAll('.daily-forecast-item');
        dailyForecastItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('selected');
                // displayHourlyForecastForDay(new Date(item.getAttribute('data-date')));
            } else {
                item.classList.remove('selected');
            }
        });
    };

    const displayError = (message) => {
        content.innerHTML = `<div class="error">${message}</div>`;
    };

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    todayTab.addEventListener('click', () => {
        todayTab.classList.add('active');
        fiveDayTab.classList.remove('active');
        content.innerHTML = ''; // Clear content
        getLocation(); // Reload current weather based on location
    });

    fiveDayTab.addEventListener('click', () => {
        todayTab.classList.remove('active');
        fiveDayTab.classList.add('active');
        content.innerHTML = ''; // Clear content
        if (currentCityData) {
            displayFiveDayForecast(currentCityData.name, currentCityData.coord.lat, currentCityData.coord.lon); // Display 5-day forecast
        }
    });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            }, () => {
                getWeather(defaultCity);
            });
        } else {
            getWeather(defaultCity);
        }
    };

    const getWeatherByCoords = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const data = await response.json();
            currentCityData = data;
            displayTodayWeather(data);
            // displayHourlyForecast(data.coord.lat, data.coord.lon);
            displayNearbyCities(data.coord.lat, data.coord.lon);
            if (fiveDayTab.classList.contains('active')) {
                displayFiveDayForecast(data.name, data.coord.lat, data.coord.lon);
            }
        } catch (error) {
            displayError(error.message);
        }
    };

    getLocation(); // Load weather for default city on page load
});
