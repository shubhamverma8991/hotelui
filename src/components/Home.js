import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchHotels from "../service/hotelService";
import "../styles/HomePage.css";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();
      setHotels(data);
    };
    loadHotels();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 2) {
      const filteredHotels = hotels.filter((hotel) => hotel.name.toLowerCase().includes(value.toLowerCase()));
      setResults(filteredHotels);
    } else {
      setResults([]);
    }
  };

  const handleCardClick = (hotelId) => {
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
        {results.map((hotel) => (
          <div key={hotel.id} className="card" onClick={() => handleCardClick(hotel.id)}>
            <img src={hotel.image} alt={hotel.name} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{hotel.name}</h3>
              <p className="card-location">{hotel.location}</p>
              <p className="card-rating">Rating: {hotel.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
