import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchHotels from "../service/hotelService";
import "../styles/HotelDetails.css";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const loadHotel = async () => {
      const hotels = await fetchHotels();
      const selectedHotel = hotels.find((h) => h.id === parseInt(hotelId));
      setHotel(selectedHotel);
    };
    loadHotel();
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel-details-container">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details-content">
        <h2 className="hotel-title">{hotel.name}</h2>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-rating">Rating: {hotel.rating}</p>
        <h3>Room Types</h3>
        <ul className="room-types">
          {hotel.roomTypes.map((room) => (
            <li key={room.id} className="room-type">
              <h4>{room.type}</h4>
              <p>Price: ${room.price}</p>
              <p>Availability: {room.availability}</p>
              <p>Amenities: {room.amenities.map((amenity) => amenity.name).join(", ")}</p>
            </li>
          ))}
        </ul>
        <h3>Amenities</h3>
        <ul className="amenities">
          {hotel.amenities.map((amenity) => (
            <li key={amenity.id}>{amenity.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotelDetails;
