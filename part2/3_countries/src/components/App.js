import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PrintCountry = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
        <br />
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => { return (<li key={language.iso639_1}>{language.name}</li>) })}
      </ul>
      <div>
        <img src={country.flag} alt={`${country.name}'s flag`} height='100px'/>
      </div>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries
      <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

const Output = ({countries, value, setFiltered}) => {
  console.log(countries)
  if(countries.length >=10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    );
  } 
  else if(countries.length>1) {
    const data = countries.map(country => {
      return (
        <React.Fragment key={country.numericCode}>
          {country.name}
          <button onClick={()=>setFiltered([country])}>show</button>
          <br />
        </React.Fragment>
      )
    })
    return (
      <>
        {data}
      </>
    );
  }
  else if(countries.length === 1) {
    return (
      <PrintCountry country={countries[0]}/>
    )
  }
  else if(value.length){
    return (
      <>
        Not Found!
      </>
    )
  }
  else {
    return (
      <>
      </>
    )
  }

    
}

const App = () => {

  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  const [searchCountry, setSearch] = useState('')
  
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=>{
        setAllCountries(response.data)
      })
  },[]);

  const search = (event) => {
    const value = event.target.value;
    setSearch(value);

    const data = allCountries.filter(a=> a.name.toLowerCase().includes( value.toLowerCase() ));
    if(value.length === 0) {
      setFiltered([]);
    }
    else {
      setFiltered(data);
    }
  } 

  return (
    <div>
      <Filter value={searchCountry} onChange={search} />
      <Output countries={filteredCountries} value={searchCountry} setFiltered={setFiltered} />
    </div>
  )
}

export default App