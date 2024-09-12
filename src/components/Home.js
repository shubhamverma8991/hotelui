import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 2) {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/hotels/search/${value}`);
      const filteredHotels = await response.json();
      setLoading(false);
      console.log(JSON.stringify(filteredHotels));
      if (filteredHotels?.message === "No hotels found") {
        setResults([]);
      } else {
        setResults(filteredHotels.data);
      }
    } else {
      setResults([]);
    }
  };

  const handleCardClick = (hotel, hotelId) => {
    console.log("clicked hotel", hotel);
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="home_container">
      <form className="max-w-md mx-auto mt-4">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Hotels..."
            value={query}
            onChange={handleSearch}
            required
          />
        </div>
      </form>
      <div className="search-results">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="no-results">Loading...</p>
          </div>
        ) : results.length > 0 ? (
          results.map((hotel) => (
            <div key={hotel.id} className="card" onClick={() => handleCardClick(hotel, hotel.id)}>
              <img src={hotel.images[0]} alt={hotel.name} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{hotel.name}</h3>
                <p className="card-location">{hotel.location}</p>
                <p className="card-rating">Rating: {hotel.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No hotels found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
