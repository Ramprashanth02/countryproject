// src/components/CountryDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://api.countrylayer.com/v2/alpha/${cca3}?access_key=81e30ac6927c93f0d78b7fa879caf52b`);
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [cca3]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="country-details">
      <h2>{country.name}</h2>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default CountryDetails;
