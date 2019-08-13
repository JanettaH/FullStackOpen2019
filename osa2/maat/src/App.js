import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        
      })
  }, [])


  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }

  const showDetails = country => {
    setFilter(country);
  }




  return (
    <div>
    <div> find countries
      <input onChange={handleInputChange} placeholder="Serch" value={filter}/>
    </div>
    <div>
      <Countries countryList={countries} filter={filter} showDetails={showDetails}/>
      </div>
      </div>
  )

}

export default App
