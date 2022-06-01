import React, {useState} from "react";
import Forecast from "./forecast";
import CurrentWeather from "./currentweather";

const DisplayForecast = () => {

    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('imperial');
    const [submit, setSubmit] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);

    const formSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    }

    return (
        <div>
           <h2>Find Weather Forecast</h2>
           <form onSubmit={formSubmit}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
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
                <button type="submit">Get Forecast</button>
            </form>
            <div>
                {submit === true ? <div>
                    <CurrentWeather uriEncodedCity={uriEncodedCity} unit={unit}/>
                    <Forecast uriEncodedCity={uriEncodedCity} unit={unit}/>
                    </div> : <></>}
            </div>
        </div>
     )
}
export default DisplayForecast;