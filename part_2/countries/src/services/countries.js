import axios from "axios";
const apiBaseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = () => {
    const response = axios.get(apiBaseUrl);
    return response.then(response => response.data)
}

export default getAllCountries;