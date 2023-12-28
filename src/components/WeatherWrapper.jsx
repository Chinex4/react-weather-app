import React, { useEffect, useState } from 'react'
import clearSky from '../assets/clear sky.png'
import fewClouds from '../assets/few clouds.png'
import scatteredClouds from '../assets/scattered clouds.png'
import brokenClouds from '../assets/broken clouds.png'
import rain from '../assets/rain.png'
import thunderStorm from '../assets/thunder storm.png'
import mist from '../assets/mist.png'
import snow from '../assets/snow.png'
import humidityIcon from '../assets/humidity.png'
import wind from '../assets/storm.png'
import loadingIcon from '../assets/infinityLoading.svg'
import axios from 'axios'
import CitySearch from './CitySearch'
import WeatherInfo from './WeatherInfo'
import HumidityWind from './HumidityWind'


const WeatherWrapper = () => {

    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState('')
    const [location, setLocation] = useState('City Name')
    const [humidity, setHumidity] = useState(0)
    const [windSpeed, setWindSpeed] = useState(0)
    const [description, setDescription] = useState('Weather Description')
    const [weatherData, setWeatherData] = useState(null)
    const [weatherIcon, setWeatherIcon] = useState(clearSky)
    const [citySuggestions, setCitySuggestions] = useState({})
    const [fetchError, setFetchError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingCity, setLoadingCity] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const apiKey = 'de8c489fab060fb54e1f2ac5f523b2ff'

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url)
                const data = response.data

                setWeatherData(data)
            } catch (error) {
                console.log(`Error fetching data: ${error}`)
                let statusCode = '404'
                let regExp = new RegExp(statusCode)
                if (regExp.test(error)) {
                    setFetchError(`Error: Please Input a valid city!`)
                }
            }
            finally {
                setLoading(false)
                setCitySuggestions({})
            }
        }
        if (city) {
            fetchData()
            setFetchError(null)
        }
        else {
            setFetchError('Input is Empty!')
        }
    }

    useEffect(() => {
        if (weatherData) {
            setHumidity(weatherData.main.humidity)
            setTemp(weatherData.main.temp)
            setDescription(weatherData.weather[0].description)
            setWindSpeed(weatherData.wind.speed)
            setLocation(weatherData.name)

            if (weatherData.weather[0].icon === '01d' || weatherData.weather[0].icon === '01n') {
                setWeatherIcon(clearSky)
            }
            else if (weatherData.weather[0].icon === '02d' || weatherData.weather[0].icon === '02n') {
                setWeatherIcon(fewClouds)
            }
            else if (weatherData.weather[0].icon === '03d' || weatherData.weather[0].icon === '03n') {
                setWeatherIcon(scatteredClouds)
            }
            else if (weatherData.weather[0].icon === '04d' || weatherData.weather[0].icon === '04n') {
                setWeatherIcon(brokenClouds)
            }
            else if (weatherData.weather[0].icon === '09d' || weatherData.weather[0].icon === '09n') {
                setWeatherIcon(rain)
            }
            else if (weatherData.weather[0].icon === '10d' || weatherData.weather[0].icon === '10n') {
                setWeatherIcon(rain)
            }
            else if (weatherData.weather[0].icon === '11d' || weatherData.weather[0].icon === '11n') {
                setWeatherIcon(rain)
            }
            else if (weatherData.weather[0].icon === '13d' || weatherData.weather[0].icon === '13n') {
                setWeatherIcon(snow)
            }
            else if (weatherData.weather[0].icon === '50d' || weatherData.weather[0].icon === '50n') {
                setWeatherIcon(mist)
            } else {
                setWeatherIcon(clearSky)
            }
        }
    }, [weatherData])

    useEffect(() => {
        const fetchCitySuggestions = async () => {
            const options = {
                method: 'GET',
                url: 'https://city-search2.p.rapidapi.com/city/autocomplete',
                params: {
                    input: city,
                },
                headers: {
                    'X-RapidAPI-Key': '1587d4744dmsh8fa0b4be60181a3p134dedjsn22d486462f24',
                    'X-RapidAPI-Host': 'city-search2.p.rapidapi.com'
                }
            }
            try {
                setLoadingCity(true)
                const response2 = await axios.request(options)
                const data2 = response2.data

                setCitySuggestions(data2.data)
            } catch (error) {
                console.log(`Error fetching city suggestions: ${error}`)
                setFetchError(`Error fetching city suggestions`)
            }
            finally {
                setLoadingCity(false)
            }
        }

        if (city) {
            fetchCitySuggestions()
            setFetchError(null)
        }

    }, [city])

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity)
        setCitySuggestions([])
    }

    return (
        <div className='w-[370px] h-[600px] md:w-[500px] md:min-h-0 md:h-[600px] bg-[#f4f4f4] md:rounded md:shadow-xl p-8 md:p-10'>
            <CitySearch loadingCity={loadingCity} setLoadingCity={setLoadingCity} fetchError={fetchError} city={city} citySuggestions={citySuggestions} handleSubmit={handleSubmit} handleCitySelect={handleCitySelect} setCity={setCity} />
            {
                loading ? (
                    <div className='w-full h-[500px] flex justify-center items-center'>
                        <img className='w-40' src={loadingIcon} alt="Loading Icon" />
                    </div>
                )
                    : (
                        <>
                            <WeatherInfo location={location} weatherIcon={weatherIcon} description={description} temp={temp} />

                            <HumidityWind wind={wind} windSpeed={windSpeed} humidity={humidity} humidityIcon={humidityIcon} />
                        </>
                    )
            }
        </div>
    )
}

export default WeatherWrapper
