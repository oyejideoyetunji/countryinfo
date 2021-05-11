import React, { useState, useEffect } from "react";
import '../styles/countries.css';
import { getCountries } from "../services/restCountries";
import { Link } from "react-router-dom";
import { countryFilterKeys } from "../lib/countrySearch";


const Countries = ({ theme }) => {

    const [countries, setCountries] = useState([]);
    const [filterKey, setFilterKey] = useState('name');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            const countriesData = await getCountries()
            setCountries(countriesData)
        }

        fetchCountries();
    }, [countries])

    const onfilterKeyChange = (event) => {
        setFilterKey(event.target.value)
    }

    const onfilterValueChange = (event) => {
        setFilterValue(event.target.value)
    }

    const getCountriesToShow = () => {
        if(!filterValue.trim()){
            return countries;
        }else {
            return countries.filter(country =>
                country[filterKey]
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            );
        }
    }

    return(
        <section className={`w-full container-margin px-2 ${theme.primaryText}`}>

            <section className={`search-block w-full flex py-1`}>
                <div className={`search-column srch-input-wrp shadow-md my-sm ${theme.cardBg}`}>
                    <input
                        value={filterValue}
                        placeholder="search for country"
                        className={`w-full ${theme.primaryText}`}
                        onChange={onfilterValueChange}
                    />
                </div>
                <div className={`search-column srch-select-wrp shadow-md my-sm ${theme.cardBg}`}>
                    <select
                        value={filterKey}
                        onChange={onfilterKeyChange}
                        className={`select-css w-full ${theme.primaryText}`}
                    >
                        {
                            countryFilterKeys.map(key => (
                                <option key={key} value={key}>{key.toUpperCase()}</option>
                            ))
                        }
                    </select>
                </div>
            </section>

            <section className={`w-full countries-grid pb-2`}>
                {!!getCountriesToShow()?.length && (
                    getCountriesToShow().map(country => (
                        <div key={country.name} className={`country-card shadow-md ${theme.cardBg}`}>
                            <Link className="w-full m-0" to={`/country/${country.name}`}>
                                <div className="w-full flag m-0" style={{backgroundImage: `url(${country.flag})`}} />
                                {/* <img className="w-full flag" alt="flag" src={country.flag} /> */}
                            </Link>
                            <div className={`px-1`}>
                                <h5>{country.name}</h5>
                                <p><span>Population:</span><span>{` ${country.population} `}</span></p>
                                <p><span>Region:</span><span>{` ${country.region} `}</span></p>
                                <p><span>Capital: </span><span>{` ${country.capital} `}</span></p>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </section>
    )
}

export default Countries;
