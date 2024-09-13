import React, { useState, useEffect } from "react";
import axios from "axios";

const AddHotel = () => {
  const [hotels, setHotels] = useState([
    {
      name: "",
      location: "",
      rating: "",
      images: [""],
      roomTypes: [],
    },
  ]);
  const [amenities, setAmenities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const amenitiesResponse = await axios.get("http://localhost:8080/api/hotels/amenities/all");
        const roomTypesResponse = await axios.get("http://localhost:8080/api/hotels/roomtypes/all");
        setAmenities(amenitiesResponse.data);
        setRoomTypes(roomTypesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleHotelChange = (hotelIndex, event) => {
    const { name, value } = event.target;
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex][name] = value;
    setHotels(updatedHotels);
  };

  const handleRoomChange = (hotelIndex, roomIndex, event) => {
    const { name, value } = event.target;
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex].roomTypes[roomIndex][name] = value;
    setHotels(updatedHotels);
  };

  const handleAddRoomFields = (hotelIndex) => {
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex].roomTypes.push({
      type: "",
      price: "",
      availability: "",
      images: [""],
      amenities: [],
    });
    setHotels(updatedHotels);
  };

  const handleRemoveRoomFields = (hotelIndex, roomIndex) => {
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex].roomTypes.splice(roomIndex, 1);
    setHotels(updatedHotels);
  };

  const handleImageUrlChange = (hotelIndex, imgIndex, event) => {
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex].images[imgIndex] = event.target.value;
    setHotels(updatedHotels);
  };

  const handleAddImageUrl = (hotelIndex) => {
    const updatedHotels = [...hotels];
    updatedHotels[hotelIndex].images.push("");
    setHotels(updatedHotels);
  };

  const handleAddHotel = () => {
    setHotels([...hotels, { name: "", location: "", rating: "", images: [""], roomTypes: [] }]);
  };

  const handleRemoveHotel = (hotelIndex) => {
    const updatedHotels = [...hotels];
    updatedHotels.splice(hotelIndex, 1);
    setHotels(updatedHotels);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (let hotel of hotels) {
      if (!hotel.name || !hotel.location || !hotel.rating) {
        setError("Please fill out the name, location, and rating for all hotels.");
        return;
      }
    }
    setError("");

    const hotelsWithImages = hotels.map((hotel) => ({
      id: null,
      name: hotel.name,
      location: hotel.location,
      rating: parseFloat(hotel.rating),
      images: hotel.images.filter((image) => image),
      roomTypes: hotel.roomTypes.map((room) => ({
        id: null,
        type: room.type,
        price: parseFloat(room.price),
        availability: parseInt(room.availability),
        images: room.images.filter((image) => image),
        amenities: room.amenities.map((amenity) => ({
          id: amenity.id,
          name: amenity.name,
        })),
      })),
    }));

    const url = hotelsWithImages.length > 1 ? "http://localhost:8080/api/hotels/bulk" : "http://localhost:8080/api/hotels/add";

    try {
      await axios.post(url, hotelsWithImages.length > 1 ? hotelsWithImages : hotelsWithImages[0]);
      alert("Hotels added successfully");
      setHotels([
        {
          name: "",
          location: "",
          rating: "",
          images: [""],
          roomTypes: [],
        },
      ]);
    } catch (error) {
      console.error("Error adding hotels:", error);
    }
  };

  return (
    <form className="max-w-5xl mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      {hotels.map((hotel, hotelIndex) => (
        <div key={hotelIndex} className="mb-6 p-6 bg-gray-100 border border-gray-300 rounded-lg relative">
          <h3 className="text-lg font-semibold mb-4">Hotel {hotelIndex + 1}</h3>
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            name="name"
            placeholder="Hotel Name"
            value={hotel.name}
            onChange={(event) => handleHotelChange(hotelIndex, event)}
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            name="location"
            placeholder="Location"
            value={hotel.location}
            onChange={(event) => handleHotelChange(hotelIndex, event)}
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            name="rating"
            placeholder="Rating"
            type="number"
            value={hotel.rating}
            onChange={(event) => handleHotelChange(hotelIndex, event)}
          />

          <h4 className="font-semibold mb-2">Image URLs:</h4>
          {hotel.images.map((url, imgIndex) => (
            <input
              key={imgIndex}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              type="text"
              placeholder="Enter Image URL"
              value={url}
              onChange={(event) => handleImageUrlChange(hotelIndex, imgIndex, event)}
            />
          ))}
          <button type="button" onClick={() => handleAddImageUrl(hotelIndex)} className=" py-2 underline text-blue-500 mb-4">
            Add Another Image URL
          </button>

          {hotel.roomTypes.map((room, roomIndex) => (
            <div key={roomIndex} className="mb-6 p-4 bg-white border border-gray-200 rounded-lg relative">
              <h4 className="font-semibold mb-4">Room Type {roomIndex + 1}</h4>
              <select
                name="type"
                value={room.type}
                onChange={(event) => handleRoomChange(hotelIndex, roomIndex, event)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
              <input
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                name="price"
                placeholder="Price"
                value={room.price}
                onChange={(event) => handleRoomChange(hotelIndex, roomIndex, event)}
              />
              <input
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                name="availability"
                placeholder="Availability"
                value={room.availability}
                onChange={(event) => handleRoomChange(hotelIndex, roomIndex, event)}
              />

              <div className="mb-4">
                <h5 className="font-semibold mb-2">Room Images:</h5>
                {room.images.map((image, imgIndex) => (
                  <input
                    key={imgIndex}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Enter Room Image URL"
                    value={image}
                    onChange={(event) => {
                      const updatedImages = [...room.images];
                      updatedImages[imgIndex] = event.target.value;
                      const updatedRooms = [...hotels[hotelIndex].roomTypes];
                      updatedRooms[roomIndex].images = updatedImages;
                      const updatedHotels = [...hotels];
                      updatedHotels[hotelIndex].roomTypes = updatedRooms;
                      setHotels(updatedHotels);
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedRooms = [...hotels[hotelIndex].roomTypes];
                    updatedRooms[roomIndex].images.push("");
                    const updatedHotels = [...hotels];
                    updatedHotels[hotelIndex].roomTypes = updatedRooms;
                    setHotels(updatedHotels);
                  }}
                  className=" py-2 underline text-blue-500 "
                >
                  Add Another Room Image URL
                </button>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold mb-2">Select Amenities:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((amenity) => (
                    <label key={amenity.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={amenity.name}
                        onChange={(event) => {
                          const updatedAmenities = [...room.amenities];
                          if (event.target.checked) {
                            updatedAmenities.push({ id: amenity.id, name: amenity.name });
                          } else {
                            const index = updatedAmenities.findIndex((a) => a.name === amenity.name);
                            updatedAmenities.splice(index, 1);
                          }
                          const updatedRooms = [...hotels[hotelIndex].roomTypes];
                          updatedRooms[roomIndex].amenities = updatedAmenities;
                          const updatedHotels = [...hotels];
                          updatedHotels[hotelIndex].roomTypes = updatedRooms;
                          setHotels(updatedHotels);
                        }}
                        className="mr-2"
                      />
                      {amenity.name}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveRoomFields(hotelIndex, roomIndex)}
                className="absolute top-0 right-0 mt-2 mr-2 text-2xl  text-black font-extrabold  p-1"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddRoomFields(hotelIndex)}
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            Add Room Type
          </button>
          <button
            type="button"
            onClick={() => handleRemoveHotel(hotelIndex)}
            className="absolute top-0 right-0 mt-2 mr-2 text-2xl  text-black font-extrabold  p-1"
          >
            &times;
          </button>
        </div>
      ))}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="button" onClick={handleAddHotel} className="py-2 underline text-blue-500 mr-4">
        Add Another Hotel
      </button>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Submit All Hotels
      </button>
    </form>
  );
};

export default AddHotel;
