import { useEffect } from "react";
import { useState } from "react";
import getAllCountries from "./services/countries";

import CountryDetails from "./components/CountryDetails";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    getAllCountries().then((data) => setCompleteList(data));
  }, []);

  const displayCountries = completeList.filter(
    (country) =>
      searchValue.length > 0 &&
      country?.name?.common.toLowerCase().includes(searchValue.toLowerCase()),
  );

  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <label>
        Find Countries:
        <input type="text" onChange={handleSearch} />
      </label>
      {displayCountries && displayCountries.length > 0 && (
        <CountryDetails countryList={displayCountries} />
      )}
    </>
  );
}

export default App;
