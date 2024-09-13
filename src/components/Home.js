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
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full bg-cover bg-center flex flex-col mt-4 items-center text-white">
        <div className="text-center">
          <h1 className="text-4xl text-black md:text-5xl font-bold mb-4 transition-transform duration-500 hover:scale-105 hover:text-blue-500">
            Find the Perfect Stay
          </h1>
          <p className="text-lg text-black md:text-xl mb-6 transition-transform duration-500 hover:translate-x-1 hover:text-blue-500">
            Discover amazing hotels worldwide
          </p>

          <form className="flex justify-center">
            <input
              type="search"
              id="hotel-search"
              className="w-full max-w-lg p-3 text-gray-900 rounded-full shadow focus:ring focus:ring-blue-500"
              placeholder="Search Hotels..."
              value={query}
              onChange={handleSearch}
              required
            />
          </form>
        </div>
      </section>

      {/* Search Results Section */}
      {query && (
        <div className="w-full max-w-7xl px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              <p className="ml-3">Loading...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleCardClick(hotel, hotel.id)}
                >
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                    <p className="text-sm font-medium text-gray-700 mt-2">Rating: {hotel.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-6">No hotels found. Please try a different search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
