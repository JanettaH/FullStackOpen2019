import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Details = ({country}) => {
    const [weatherDetails, setWeatherDetails] = useState({});

    useEffect(() => {
        axios
          .get('https://api.apixu.com/v1/current.json?key=325e05842bfc442bac0145303191308&q=' + country.capital)
          .then(response => {
            setWeatherDetails(response.data) 
            console.log(response.data)
          })
      }, [])


    return ( 
    <div>
        {weatherDetails.current == undefined? (
            <p>loading...</p>
        ) : (
            <div>
            <h2>{country.name}</h2>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h3>languages</h3>
            <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img height="100" width="150" alt="kuva lipusta" src={country.flag}></img>
            <h3>Weather in {country.name}</h3>
            <p>temperature: {weatherDetails.current.temp_c} Celsius</p>
            <img alt="icon" src={"https:" + weatherDetails.current.condition.icon}/>
            <p>wind: {weatherDetails.current.gust_kph} kph direction {weatherDetails.current.wind_dir}</p>
            </div>
        )} 
    </div> );
}
 
export default Details;