import React, { useState, useEffect } from 'react';
import { getCountry } from '../services/restCountries';
import '../styles/country.css';
import { Link } from 'react-router-dom';



const Country = ({ match, theme }) => {

    const name = match.params.countryName;
    const [country, setCountry] = useState();

    useEffect(() => {
        const fetchCountry = async() => {
            const countryData = await getCountry(name)
            setCountry(countryData)
        }

        fetchCountry()
    }, [name])

    return(
        <section className={`w-full container-margin px-2 ${theme.primaryText}`}>

            <section className={`w-full py-1`}>
                <button className={`${theme.cardBg}`}>
                    <Link className={`link ${theme.primaryText}`} to="/">
                        back
                    </Link>
                </button>
            </section>
                
            {!!country && (
                <section className="w-full details-grid">
                    <div
                        className={`details-card img-wrapper`}
                    >
                        <img className="w-full" src={country.flag} alt="country flag" />
                    </div>
                    <div className={`details-card`}>
                        <h2>{country.name}</h2>

                        <div className={`w-full basic-info-grid`}>
                            <div className={`grid-item`}>
                                <p>
                                    <span>Native Name: </span><span>{country.nativeName}</span>
                                </p>
                                <p>
                                    <span>Population: </span><span>{country.population}</span>
                                </p>
                                <p>
                                    <span>Region: </span><span>{country.region}</span>
                                </p>
                                <p>
                                    <span>Subregion: </span><span>{country.subregion}</span>
                                </p>
                                <p>
                                    <span>Capital: </span><span>{country.capital}</span>
                                </p>
                            </div>
                            <div className={`grid-item`}>
                                <p>
                                    <span>Top Level Domian: </span>
                                    <span>{country.topLevelDomain.join(', ')}</span>
                                </p>
                                <p>
                                    <span>Currencies: </span>
                                    <span>
                                        {country.currencies.map(currency => currency.code).join(', ')}
                                    </span>
                                </p>
                                <p>
                                    <span>Languages: </span>
                                    <span>{country.languages.map(lang => lang.name).join(', ')}</span>
                                </p>
                            </div>
                        </div>
                        
                        <section className={`flex flex-wrap items-center py-2`}>
                            <span>Border Countries: </span>
                            {
                                country.borders.map(bordC => (
                                    <button className={`m-sm my-sm ${theme.primaryText} ${theme.cardBg}`} key={bordC}>
                                        {bordC}
                                    </button>
                                ))
                            }
                        </section>

                    </div>
                </section>
            )}
        </section>
    )
}

export default Country;
