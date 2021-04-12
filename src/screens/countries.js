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

        fetchCountries()
    }, [countries])

    const onfilterKeyChange = (event) => {
        setFilterKey(event.target.value)
    }

    const onfilterValueChange = (event) => {
        setFilterValue(event.target.value)
    }

    const getCountriesToShow = () => {
        if(!filterValue.trim()){
            return countries
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

            <section className={`w-full flex items-center justify-between py-2`}>
                <div className={`search-input w-half shadow-md ${theme.cardBg}`}>
                    <input
                        value={filterValue}
                        placeholder="search for country"
                        className={`w-full ${theme.primaryText}`}
                        onChange={onfilterValueChange}
                    />
                </div>
                <span className="px-2"/>
                <div className={`search-input w-30p shadow-md ${theme.cardBg}`}>
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
                {!!getCountriesToShow().length && (
                    getCountriesToShow().map(country => (
                        <div key={country.name} className={`country-card shadow-md ${theme.cardBg}`}>
                            <Link to={`/country/${country.name}`}>
                                <div
                                    className={`w-full flag-bearer`}
                                    style={{backgroundImage: `url(${country.flag})`}}
                                />
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
