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
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      const filteredHotels = hotels.filter((hotel) => hotel.name.toLowerCase().includes(event.target.value.toLowerCase()));
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
      <div className="search-containe">
        <input className="search-input" type="text" placeholder="Search Hotels" value={query} onChange={handleSearch} />
      </div>
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
