import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DelHotel.css";

const DeleteHotel = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("/api/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`/api/hotels/${hotelId}`);
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      alert("Hotel deleted successfully");
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="delete-container">
      <ul className="delete-list">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="delete-list-item">
            {hotel.name}
            <button className="delete-button" onClick={() => handleDelete(hotel.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteHotel;
