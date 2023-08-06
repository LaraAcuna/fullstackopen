import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import weatherService from './services/weather'

const Weather = ({ weather }) => {
    return (
        <div>
            <p>Temperature {weather.current_weather.temperature} Celcius</p>
            <p>Wind {weather.current_weather.windspeed} Km/h </p>
        </div>
    )
}
const Country = ({ data, weather }) => {
    const languages = Object.values(data.languages);
    return (
        <div>
            <h2>{data.name.common}</h2>
            <p>capital {data.capital[0]}</p>
            <p>area {data.area}</p>
            <h3>languages</h3>
            <ul>
                {
                    languages.map(lang => <li key={lang}>{lang}</li>)
                }
            </ul>
            <img src={`${data.flags.png}`} />
            <h3>Weather in {data.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}
const List = ({ items, showData }) => {
    if (items.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    if (items.length > 1) {
        return (
            items.map(item => <p key={item.name.common}>{item.name.common} <button onClick={() => showData(item.name.common)}>show</button></p>)
        )
    }
}
const App = () => {
    const [searchPrompt, setSearchPrompt] = useState('')
    const [countryList, setCountryList] = useState([])
    const [matchedCountries, setMatchedCountries] = useState([])
    const [weatherData, setWeatherData] = useState(null)
    useEffect(
        () => {
            countryService
                .getAll()
                .then(countries => {
                    setCountryList(countries)
                })
        }, []
    )

    useEffect(
        () => {
            if (matchedCountries.length === 1) {
                const countryData = matchedCountries[0]
                weatherService
                    .get(countryData.latlng[0], countryData.latlng[1])
                    .then(weather => {
                        setWeatherData(weather)
                    })
            } else {
                setWeatherData(null)
            }
        }, [matchedCountries]
    )

    const showData = (name) => {
        setSearchPrompt(name)
        setMatchedCountries(matchedCountries.filter(country => country.name.common === name))
    }
    const searchHandler = (event) => {
        const prompt = event.target.value
        const filtered = countryList.filter(country => country.name.common.toLowerCase().includes(prompt.toLowerCase()))
        setSearchPrompt(prompt)
        setMatchedCountries(filtered)
    }

    return (
        <div>
            Find Countries <input value={searchPrompt} onChange={searchHandler} />
            {
                weatherData ?
                    <Country data={matchedCountries[0]} weather={weatherData} /> :
                    <List items={matchedCountries} showData={showData} />
            }
        </div>
    )
}
export default App;
