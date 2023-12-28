import React from 'react'

const CitySearch = ({ citySuggestions, city, handleSubmit, handleCitySelect, setCity, fetchError, loadingCity, setLoadingCity }) => {
    return (
        <div className='relative w-full flex flex-col'>
            <form onSubmit={handleSubmit} className='w-full flex' action="">
                <input value={city} onChange={e => setCity(e.target.value)} className='w-full focus:outline-none border px-4' type="text" placeholder='Search for a City name' />
                <button className='flex space-x-2 px-4 py-2 bg-[#113e67] text-white hover:bg-blue-900 transition-all'>
                    <p>Search</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>
            {
                fetchError == null ?
                    <p></p>
                    : <p className='w-full text-lg text-center absolute top-12 text-red-600 font-semibold transition-all'>{fetchError}</p>

            }
            {
                citySuggestions.length > 0 && (
                    <ul className='max-h-52 overflow-y-scroll absolute top-14 w-full bg-white rounded p-4 space-y-2'>
                        {
                            loadingCity ? (
                                <div className='w-full justify-center'>
                                    <p className='font-semibold'>Loading Cities...</p>
                                </div>
                            ) : (
                                citySuggestions.map((suggestion) => (
                                    <li className='cursor-pointer hover:bg-gray-100 px-2' key={`${suggestion.name}-${suggestion.stateCode}`} onClick={() => handleCitySelect(suggestion.name)}>
                                        {suggestion.name}, {suggestion.stateCode}, {suggestion.countryCode}
                                    </li>
                                ))
                            )
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default CitySearch
