// src/components/CountryCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <h3>{country.name}</h3>
      <Link to={`/country/${country.alpha3Code}`}>View Details</Link>
    </div>
  );
};

export default CountryCard;
