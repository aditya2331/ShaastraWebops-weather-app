import React, {useState} from "react";

const CurrentWeather = ({uriEncodedCity}, {unit}) => {

    const [weathercurrentinfo, setWeatherCurrentInfo] = useState({});

    function getCurrentWeather(e) {
        // weather data fetch function will go here
        e.preventDefault();
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': 'fd1997bc92msh1a9653c084b7071p1cec85jsn1d5eee4df3d5'
            }
        };
        
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=${unit}`, options)
            .then(response => response.json())
            .then(response => setWeatherCurrentInfo(response))
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

    return (
        <div>
           {weathercurrentinfo.cod === "200" ?
               <div>
                   <p><strong>{weathercurrentinfo.name}</strong></p>
                   <p>It is currently {Math.round(weathercurrentinfo.main.temp)} with {weathercurrentinfo.weather[0].description}.</p>
               </div>
           : null
           }
       </div>
    )
}

export default CurrentWeather;