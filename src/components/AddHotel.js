import React, { useState } from "react";
import axios from "axios";
import "../styles/AddHotel.css";

const AddHotel = () => {
  const [hotels, setHotels] = useState([{ name: "", location: "", amenities: "" }]);

  const handleChange = (index, event) => {
    const values = [...hotels];
    values[index][event.target.name] = event.target.value;
    setHotels(values);
  };

  const handleAddFields = () => {
    setHotels([...hotels, { name: "", location: "", amenities: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...hotels];
    values.splice(index, 1);
    setHotels(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/hotels", { hotels });
      alert("Hotels added successfully");
    } catch (error) {
      console.error("Error adding hotels:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {hotels.map((hotel, index) => (
        <div key={index} className="form-group">
          <input
            className="form-input"
            name="name"
            placeholder="Hotel Name"
            value={hotel.name}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            className="form-input"
            name="location"
            placeholder="Location"
            value={hotel.location}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            className="form-input"
            name="amenities"
            placeholder="Amenities"
            value={hotel.amenities}
            onChange={(event) => handleChange(index, event)}
          />
          <button className="form-button" type="button" onClick={() => handleRemoveFields(index)}>
            Remove
          </button>
        </div>
      ))}
      <button className="form-button" type="button" onClick={handleAddFields}>
        Add Hotel
      </button>
      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddHotel;
