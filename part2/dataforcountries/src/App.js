import React, {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CapitalWeather = ({capital}) => {
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    let isMounted = true;
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    .then(response => {
      if (isMounted) {
        setWeatherData(response.data)
      }
    })
    return () => {
      isMounted = false;
    }
  }, [capital])

  if (Object.keys(weatherData).length === 0) {
    return null
  }
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weatherData.current.temperature}</p>
      <img src={weatherData.current.weather_icons[0]} alt={`${weatherData.current.weather_descriptions[0]} weather icon`} />
      <p>wind: {}</p>
    </div>
  )
}

const CountryFilter = ({filter, setFilter}) => (
  <div>
    find countries <input value={filter} onChange={event => setFilter(event.target.value)}/>
  </div>
)

const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`the flag of ${country.name}`} height="100px"/>
      <CapitalWeather capital={country.capital} />
    </div>
  )
}

const Country = ({country, button}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  if (!button) {
    return <CountryInfo country={country}/>
  }

  else {
    const handleClick = () => {
      setShowInfo(!showInfo)
    }

    if (!showInfo) {
      return <div>{country.name} <button onClick={handleClick}>show</button></div>
    }
    else {
      return (
        <div>
          {country.name} <button onClick={handleClick}>hide</button>
          <CountryInfo country={country} />
        </div>
      )
    }
  }
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length === 1) {
    const [country] = countries
    return (
      <Country country={country} button={false} />
    )
  }
  else {
    return (
      <div>
        {countries.map(country => <Country key={country.name} country={country} button={true} />)}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]) // using state to rerender after first api request
  const [filter, setFilter] = useState('')

  useEffect(() => { // useEffect to run this only once
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  }, [])

  return(
    <>
      <CountryFilter filter={filter} setFilter={setFilter}/>
      <Countries countries={countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))}/>
    </>
  )

}

export default App;
