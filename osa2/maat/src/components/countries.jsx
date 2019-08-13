import React from 'react';
import Details from './details'

const Countries = ({countryList, filter, showDetails}) => {
    const getDetails = (name) => () => {
        showDetails(name);
    }

    var filtered = countryList.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if(filtered.length === 1) {
        return(<div>
            <Details country={filtered[0]} />
        </div>)
    } else if (filtered.length >= 2 && filtered.length <= 10){
        return (<div>{
            filtered.map(country => <div key={country.name}><h3 key={country.name}>{country.name}</h3><button onClick={getDetails(country.name)}>show</button></div>)
        }
        </div>)
    }
    else if (filtered.length === 0) {
        return( <div>no matches</div>)
    }
    else {
    return ( <div>
        Too many matches, specify another filter
    </div> );
    }

}
 
export default Countries;