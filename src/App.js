import React, { useState, useEffect } from 'react';
import './App.css';
import CountryCard from './components/CountryCard';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';

const API_KEY = '81e30ac6927c93f0d78b7fa879caf52b'; // Replace with your actual API key
const API_URL = `https://api.countrylayer.com/v2/all?access_key=${API_KEY}`;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error('Data is not an array:', data);
        }
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
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results.slice(0, 5)); // Show up to 5 results as suggestions
  };

  return (
    <Router>
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
                    key={country.alpha3Code}
                    className="search-item"
                    onClick={() => setShowAll(true)}
                  >
                    {country.name}
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
          <Routes>
            <Route path="/" element={
              <div className="country-list">
                {(showAll ? searchResults : countries).map((country) => (
                  <CountryCard key={country.alpha3Code} country={country} />
                ))}
              </div>
            } />
            <Route path="/country/:cca3" element={<CountryDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
