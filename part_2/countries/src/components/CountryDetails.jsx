import { useEffect } from "react";
import { useState } from "react";
import Weather from "./Weather";

export default function CountryDetails({ countryList }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null);
  }, [countryList]);

  function countryToBeDisplayed(countryDetails) {
    return (
      <div>
        <h1>{countryDetails.name.common}</h1>
        <div>
          <li>Capital {countryDetails.capital}</li>
          <li>Area {countryDetails.area}</li>
        </div>
        <h1>Languages</h1>
        <ul>
          {Object.values(countryDetails.languages).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <img src={countryDetails.flags.png} alt="flag-img" />
        <Weather lat={countryDetails.capitalInfo.latlng[0]} long={countryDetails.capitalInfo.latlng[1]} capital={countryDetails.capital} />
      </div>
    );
  }

  if (!countryList || countryList.length == 0) return null;

  const length = countryList.length;
  if (length > 10) return <p>Too many matches, specify another filter</p>;

  if (length === 1) return countryToBeDisplayed(countryList[0]);

  return (
    <div style={{ marginTop: "20px" }}>
      {!selectedCountry &&
        countryList.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </li>
        ))}
      {selectedCountry && countryToBeDisplayed(selectedCountry)}
    </div>
  );
}
