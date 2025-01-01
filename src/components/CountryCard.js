import React from 'react';
import './CountryCard.css';

function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
    </div>
  );
}

export default CountryCard;
