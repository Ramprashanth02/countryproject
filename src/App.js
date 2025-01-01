import React, { useState, useEffect } from 'react';
import './App.css';
import CountryCard from './components/CountryCard';

function App() {
  const [countries, setCountries] = useState([]); // Stores the list of countries
  const [searchResults, setSearchResults] = useState([]); // Stores search results
  const [searchQuery, setSearchQuery] = useState(''); // Tracks search input
  const [showAll, setShowAll] = useState(false); // Whether to show all search results
  const [loading, setLoading] = useState(false); // Loading indicator

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Search countries by name
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowAll(false);
      return;
    }

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results.slice(0, 5)); // Show up to 5 results as suggestions
  };

  return (
    <div className="App">
      <header>
        <h1>Country Explorer</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchQuery && (
            <div className="search-dropdown">
              {searchResults.map((country) => (
                <div
                  key={country.cca3}
                  className="search-item"
                  onClick={() => setShowAll(true)}
                >
                  {country.name.common}
                </div>
              ))}
              {searchResults.length > 0 && (
                <div
                  className="search-item view-all"
                  onClick={() => setShowAll(true)}
                >
                  View All
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="country-list">
          {(showAll ? searchResults : countries).map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
        {loading && <div className="loading">Loading...</div>}
      </main>
    </div>
  );
}

export default App;
