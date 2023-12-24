import React from 'react'

const WeatherInfo = ({weatherIcon, location, description, temp}) => {
    return (
        <div className='mt-8 w-full flex items-center flex-col space-y-4'>
            <img src={weatherIcon} alt="" className='w-52' />
            <div className='text-center space-y-2'>
                <p className='text-3xl font-semibold'>{Math.floor(temp)}&deg;C</p>
                <h1 className='text-4xl font-semibold first-letter:capitalize'>{location}</h1>
                <p className='text-slate-500 first-letter:capitalize'>{description}</p>

            </div>
        </div>
    )
}

export default WeatherInfo
