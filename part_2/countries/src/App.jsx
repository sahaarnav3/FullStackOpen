import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [completeList, setCompleteList] = useState([]);
  const apiBaseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios
      .get(apiBaseUrl)
      .then((response) => setCompleteList(response.data))
      .catch((err) => console.log("Couldn't fetch countries:", err));
  }, []);

  const displayCountries = completeList.filter(
    (country) =>
      searchValue.length > 0 &&
      country?.name?.common.toLowerCase().includes(searchValue.toLowerCase()),
  );

  function handleSearch(e){
    setSearchValue(e.target.value);
  }

  return (
    <>
      <label>
        Find Countries:
        <input type="text" onChange={handleSearch} />
      </label>
      {displayCountries && displayCountries.length > 0 && <CountryDetails countryList={displayCountries} />}
    </>
  );
}

export default App;
