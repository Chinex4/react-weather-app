import React from 'react'

const HumidityWind = ({ humidityIcon, humidity, windSpeed, wind }) => {
    return (
        <div className='mt-8 w-full flex justify-between'>
            <div className='flex space-x-2 items-center'>
                <img src={humidityIcon} className='w-7' />
                <div className='-space-y-2'>
                    <h2 className='text-2xl'>{humidity}%</h2>
                    <p className='text-xl'>Humidity</p>
                </div>
            </div>
            <div className='flex space-x-2 items-center'>
                <img src={wind} className='w-7' />
                <div className='-space-y-2'>
                    <h2 className='text-2xl'>{windSpeed}m/s</h2>
                    <p className='text-xl'>Wind Speed</p>
                </div>
            </div>

        </div>
    )
}

export default HumidityWind
