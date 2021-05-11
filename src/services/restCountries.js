import axios from "axios";

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
const baseUrl = "https://restcountries.eu/rest/v2";


const getCountryByName = async (countryName) => {
    try {
        const { data: [country] } = await axios.get(
            `${baseUrl}/name/${countryName}?fullText=true`
        )
        return country;
    } catch (err) {
        console.log(err)
    }
}

const getCountryByCode = async (countrycode) => {
    try {
        const { data } = await axios.get(
            `${baseUrl}/alpha/${countrycode}`
        )
        return data;
    } catch (err) {
        console.log(err)
    }
}

export const getCountry = async (queryValue, queryKey) => {

    const getCountryMethods = {
        "name": async (name) => await getCountryByName(name),
        "code": async (code) => await getCountryByCode(code),
    }

    return await getCountryMethods[queryKey](queryValue);
}

export const getCountries = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/all`);
        return data;
    } catch (err) {
        console.log(err)
    }
};
