import axios from "axios";

const fetchHotels = async () => {
  try {
    const response = await axios.get("/data/hotels.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};

export default fetchHotels;
