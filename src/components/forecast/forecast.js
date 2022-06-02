import React, {useState} from "react";

const Forecast = ({curday}) => {

    const [forecastInfo, setForecastInfo] = useState({});
    const [weathercurrentinfo, setWeatherCurrentInfo] = useState({});
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('imperial');
    const uriEncodedCity = encodeURIComponent(city);


    function cToF(celsius) 
    {
    var cTemp = celsius;
    var cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr;
    }

    function dayconvert(day) 
    {
        if (day === 0)
        {
            return "Sunday";
        }
        if (day === 1)
        {
            return "Monday";
        }
        if (day === 2)
        {
            return "Tuesday";    
        }
        if (day === 4)
        {
            return "Thursday";    
        }
        if (day === 5)
        {
            return "Friday";    
        }
        if (day === 6)
        {
            return "Saturday";    
        }
        if (day === 3)
        {
            return "WEDNESDAY";    
        }
    }

    function getForecast(e) {
        // weather data fetch functions will go here
        e.preventDefault();
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': 'fd1997bc92msh1a9653c084b7071p1cec85jsn1d5eee4df3d5'
            }
        };
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=metric`, options)
            .then(response => response.json())
            .then(response => {
                setWeatherCurrentInfo(response)
            })
            .then(response => console.log(response))
            .catch(err => console.error(err));

        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${uriEncodedCity}&cnt=4&units=metric`, options)
            .then(response => response.json())
            .then(response => {
                setForecastInfo(response)
            })
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    function iconvert(props) {
        var icon = props.weather[0].icon;
        return 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      }

    return (
            
                <div>
                    {(forecastInfo.cod === "200" && weathercurrentinfo.cod === 200) ?
                    <div>
                    <h1>Get the weather forecast for any city.</h1>
                    <form onSubmit={getForecast}>
                         <input
                             type="text"
                             placeholder="Enter City"
                             value={city}
                             onChange={(e) => setCity(e.target.value)}
                             title="Enter City"
                             />
                             <button type="submit" title="Get Forecast">Get Forecast</button>
                         <label>
                             <input
                                 type="radio"
                                 name="units"
                                 checked={unit === "imperial"}
                                 value="imperial"
                                 onChange={(e) => setUnit(e.target.value)}
                                 />
                             Fahrenheit
                         </label>
                         <label>
                             <input
                                 type="radio"
                                 name="units"
                                 checked={unit === "metric"}
                                 value="metric"
                                 onChange={(e) => setUnit(e.target.value)}
                                 />
                             Celsius
                         </label>
                         
                     </form>
                        <div className="weather-info">
                                {unit === 'imperial' ?
                                <div>
                                    <div className="forecast-current">
                                        <h1><strong>{weathercurrentinfo.name}, {weathercurrentinfo.sys.country}</strong></h1>
                                        <img src={iconvert(weathercurrentinfo)} alt="weather icon"></img>
                                        <p className="current-weather">Current Weather: {Math.round(cToF(weathercurrentinfo.main.temp))}°F, {weathercurrentinfo.weather[0].description}.</p>
                                    </div> 
                                    <div className="grid-container">
                                        <div className="forecast-day">
                                        <img src={iconvert(forecastInfo.list[1])} alt="weather icon"></img>
                                        <p>{dayconvert((curday + 1)%7)}: {Math.round(cToF(forecastInfo.list[1].temp.day))}°F and {forecastInfo.list[1].weather[0].description}.</p>
                                        </div>
                                        <div className="forecast-day">
                                            <img src={iconvert(forecastInfo.list[2])} alt="weather icon"></img>
                                            <p>{dayconvert((curday + 2)%7)}: {Math.round(cToF(forecastInfo.list[2].temp.day))}°F and {forecastInfo.list[2].weather[0].description}.</p>
                                        </div>
                                        <div className="forecast-day">
                                            <img src={iconvert(forecastInfo.list[3])} alt="weather icon"></img>
                                            <p>{dayconvert((curday + 3)%7)}: {Math.round(cToF(forecastInfo.list[3].temp.day))}°F and {forecastInfo.list[3].weather[0].description}.</p>
                                        </div>
                                    </div>
                                </div> :
                                <div>
                                    <div className="forecast-current">
                                        <h1><strong>{weathercurrentinfo.name}, {weathercurrentinfo.sys.country}</strong></h1>
                                        <img src={iconvert(weathercurrentinfo)} alt="weather icon"></img>
                                        <p className="current-weather">Current Weather: {Math.round(weathercurrentinfo.main.temp)}°C, {weathercurrentinfo.weather[0].description}.</p>
                                    </div>
                                    <div className="grid-container">
                                        <div className="forecast-day">
                                        <img src={iconvert(forecastInfo.list[1])} alt="weather icon"></img>
                                        <p>{dayconvert((curday + 1)%7)}: {Math.round(forecastInfo.list[1].temp.day)}°C and {forecastInfo.list[1].weather[0].description}.</p>
                                        </div>
                                        <div className="forecast-day">
                                            <img src={iconvert(forecastInfo.list[2])} alt="weather icon"></img>
                                            <p>{dayconvert((curday + 2)%7)}: {Math.round(forecastInfo.list[2].temp.day)}°C and {forecastInfo.list[2].weather[0].description}.</p>
                                        </div>
                                        <div className="forecast-day">
                                            <img src={iconvert(forecastInfo.list[3])} alt="weather icon"></img>
                                            <p>{dayconvert((curday + 3)%7)}: {Math.round(forecastInfo.list[3].temp.day)}°C and {forecastInfo.list[3].weather[0].description}.</p>
                                        </div>
                                    </div>
                                </div>
                                }
                        </div>
                    </div>
                    : 
                    <div className="landing">
                        <h1 className="landing-text">Get the weather forecast for any city.</h1>
                            <form onSubmit={getForecast}>
                                    <input
                                        type="text"
                                        placeholder="Enter City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        title="Enter City"
                                        />
                                        <button type="submit" title="Get Forecast">Get Forecast</button>
                                    <label>
                                        <input
                                            type="radio"
                                            name="units"
                                            checked={unit === "imperial"}
                                            value="imperial"
                                            onChange={(e) => setUnit(e.target.value)}
                                            />
                                        Fahrenheit
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="units"
                                            checked={unit === "metric"}
                                            value="metric"
                                            onChange={(e) => setUnit(e.target.value)}
                                            />
                                        Celsius
                                    </label>
                                    
                            </form>
                    </div>
                    }
                </div>
        )
}
export default Forecast;
