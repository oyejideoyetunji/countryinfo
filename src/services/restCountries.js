import axios from "axios";


const baseUrl = "https://restcountries.eu/rest/v2";

export const getCountries = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/all`);
        return data;
    } catch (err) {
        console.log(err)
    }
};

export const getCountry = async (countryName) => {
    try {
        const { data: [ country ] } = await axios.get(
            `${baseUrl}/name/${countryName}?fullText=true`
        )
        return country;
    } catch (err) {
        console.log(err)
    }
}