import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    images: [""],
    roomTypes: [],
  });
  const [amenities, setAmenities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedHotelIds, setSelectedHotelIds] = useState([]);

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

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchName(value);
    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/hotels/search/${value}`);
        const filteredHotels = await response.json();
        if (filteredHotels?.message === "No hotels found") {
          setHotels([]);
          setNoResultsMessage("No hotels found with that name.");
        } else {
          setHotels(filteredHotels.data);
          setNoResultsMessage("");
        }
      } catch (error) {
        console.error("Error searching hotels:", error);
        setNoResultsMessage("Error searching for hotels.");
      } finally {
        setLoading(false);
      }
    } else {
      setHotels([]);
      setNoResultsMessage("");
    }
  };

  const updateHotel = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hotels/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedData }),
      });
      if (response.ok) {
        setSelectedHotel(null);
        handleSearch({ target: { value: searchName } });
      } else {
        console.error("Failed to update hotel.");
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/hotels/delete/${id}`, {
        method: "DELETE",
      });
      handleSearch({ target: { value: searchName } });
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const bulkDeleteHotels = async () => {
    if (selectedHotelIds.length > 0) {
      try {
        await fetch(`http://localhost:8080/api/hotels/delete/bulk`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedHotelIds),
        });
        setSelectedHotelIds([]);
        handleSearch({ target: { value: searchName } });
      } catch (error) {
        console.error("Error deleting hotels in bulk:", error);
      }
    }
  };

  const handleUpdateChange = (e) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoomChange = (roomIndex, e) => {
    setUpdatedData((prevData) => {
      const updatedRooms = [...prevData.roomTypes];
      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        [e.target.name]: e.target.value,
      };
      return {
        ...prevData,
        roomTypes: updatedRooms,
      };
    });
  };

  const handleAddRoom = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      roomTypes: [...prevData.roomTypes, { type: "", price: "", availability: "", images: [], amenities: [] }],
    }));
  };

  const handleAmenityChange = (roomIndex, amenity) => {
    setUpdatedData((prevData) => {
      const updatedRooms = [...prevData.roomTypes];
      const room = { ...updatedRooms[roomIndex] };
      if (!room.amenities) {
        room.amenities = [];
      }
      const amenityExists = room.amenities.some((a) => a.id === amenity.id);
      if (amenityExists) {
        room.amenities = room.amenities.filter((a) => a.id !== amenity.id);
      } else {
        room.amenities = [...room.amenities, { ...amenity }];
      }
      updatedRooms[roomIndex] = room;
      return {
        ...prevData,
        roomTypes: updatedRooms,
      };
    });
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setUpdatedData({
      ...hotel,
      images: hotel.images || [""],
      roomTypes: hotel.roomTypes.map((room) => ({
        ...room,
        amenities: room.amenities || [],
      })),
    });
  };

  return (
    <div className="p-6 mt-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <input
        type="text"
        value={searchName}
        onChange={handleSearch}
        placeholder="Search hotel by name"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Search
      </button>
      {loading && <div className="mt-4 text-blue-500">Loading...</div>}
      {noResultsMessage && <div className="mt-4 text-red-500">{noResultsMessage}</div>}

      <ul className="mt-6">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-4 shadow">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedHotelIds.includes(hotel.id)}
                onChange={() => handleSelectHotel(hotel.id)}
                className="mr-4"
              />
              {hotel.name} - {hotel.location}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedHotel(hotel);
                  setUpdatedData({
                    ...hotel,
                    images: hotel.images || [""],
                    roomTypes: hotel.roomTypes || [],
                  });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button onClick={() => deleteHotel(hotel.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedHotelIds.length > 1 && (
        <button onClick={bulkDeleteHotels} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4 mb-4">
          Delete Selected Hotels
        </button>
      )}
      {selectedHotel && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Edit Hotel Details</h3>
          <input
            name="name"
            placeholder="Name"
            value={updatedData.name}
            onChange={handleUpdateChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            name="location"
            placeholder="Location"
            value={updatedData.location}
            onChange={handleUpdateChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            name="rating"
            placeholder="Rating"
            type="number"
            step="0.1"
            value={updatedData.rating}
            onChange={handleUpdateChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <h4 className="text-lg font-semibold mt-6 mb-2">Image URLs:</h4>
          {updatedData.images.map((url, imgIndex) => (
            <input
              key={imgIndex}
              type="text"
              placeholder="Enter Image URL"
              value={url}
              onChange={(e) => {
                const updatedImages = [...updatedData.images];
                updatedImages[imgIndex] = e.target.value;
                setUpdatedData({ ...updatedData, images: updatedImages });
              }}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => setUpdatedData({ ...updatedData, images: [...updatedData.images, ""] })}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Add Another Image URL
          </button>
          {updatedData.roomTypes.map((room, roomIndex) => (
            <div key={roomIndex} className="p-4 mt-6 border border-gray-300 rounded">
              <h4 className="text-lg font-semibold mb-4">Room Type {roomIndex + 1}</h4>
              <select
                name="type"
                value={room.type}
                onChange={(e) => handleRoomChange(roomIndex, e)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type}
                  </option>
                ))}
              </select>
              <input
                name="price"
                placeholder="Price"
                value={room.price}
                onChange={(e) => handleRoomChange(roomIndex, e)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                name="availability"
                placeholder="Availability"
                value={room.availability}
                onChange={(e) => handleRoomChange(roomIndex, e)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {room.images.map((image, imgIndex) => (
                <input
                  key={imgIndex}
                  type="text"
                  placeholder="Enter Room Image URL"
                  value={image}
                  onChange={(e) => {
                    const updatedImages = [...room.images];
                    updatedImages[imgIndex] = e.target.value;
                    const updatedRooms = [...updatedData.roomTypes];
                    updatedRooms[roomIndex].images = updatedImages;
                    setUpdatedData({ ...updatedData, roomTypes: updatedRooms });
                  }}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedRooms = [...updatedData.roomTypes];
                  updatedRooms[roomIndex].images.push("");
                  setUpdatedData({ ...updatedData, roomTypes: updatedRooms });
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Add Another Room Image URL
              </button>

              <div className="mt-4">
                <h5 className="font-semibold mb-2">Select Amenities:</h5>
                <div className="flex flex-wrap">
                  {amenities.map((amenity) => (
                    <label key={amenity.id} className="mr-4 mb-2">
                      <input
                        type="checkbox"
                        checked={updatedData.roomTypes[roomIndex]?.amenities.some((a) => a.id === amenity.id) || false}
                        onChange={() => handleAmenityChange(roomIndex, amenity)}
                        className="mr-1"
                      />
                      {amenity.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddRoom} className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Add Room Type
          </button>
          <button
            onClick={() => updateHotel(selectedHotel.id)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateHotel;
