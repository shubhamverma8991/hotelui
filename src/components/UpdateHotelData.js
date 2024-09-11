import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddHotel.css";

const UpdateHotel = ({ hotelId }) => {
  const [hotel, setHotel] = useState({ name: "", location: "", amenities: "" });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/api/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };
    fetchHotel();
  }, [hotelId]);

  const handleChange = (event) => {
    setHotel({ ...hotel, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/hotels/${hotelId}`, hotel);
      alert("Hotel updated successfully");
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input className="form-input" name="name" placeholder="Hotel Name" value={hotel.name} onChange={handleChange} />
      <input className="form-input" name="location" placeholder="Location" value={hotel.location} onChange={handleChange} />
      <input className="form-input" name="amenities" placeholder="Amenities" value={hotel.amenities} onChange={handleChange} />
      <button className="form-button" type="submit">
        Update
      </button>
    </form>
  );
};

export default UpdateHotel;
