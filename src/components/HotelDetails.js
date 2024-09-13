import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 480);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      const response = await fetch(`http://localhost:8080/api/hotels/${hotelId}`);
      const data = await response.json();
      setHotel(data.data);
    };

    fetchHotelDetails();
  }, [hotelId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!hotel) {
    return <p>Loading...</p>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-2 text-center">{hotel.name}</h2>
      <div className="w-1/2">
        <p className="text-sm font-medium">
          <svg viewBox="0 0 24 24" width="18px" height="18px" class="d Vb egaXP icjEL">
            <path
              fill="blue"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.25 9.799c0-4.247 3.488-7.707 7.75-7.707s7.75 3.46 7.75 7.707c0 2.28-1.138 4.477-2.471 6.323-1.31 1.813-2.883 3.388-3.977 4.483l-.083.083-.002.002-1.225 1.218-1.213-1.243-.03-.03-.012-.013c-1.1-1.092-2.705-2.687-4.035-4.53-1.324-1.838-2.452-4.024-2.452-6.293M12 3.592c-3.442 0-6.25 2.797-6.25 6.207 0 1.796.907 3.665 2.17 5.415 1.252 1.736 2.778 3.256 3.886 4.357l.043.042.16.164.148-.149.002-.002.061-.06c1.103-1.105 2.605-2.608 3.843-4.322 1.271-1.76 2.187-3.64 2.187-5.445 0-3.41-2.808-6.207-6.25-6.207m1.699 5.013a1.838 1.838 0 1 0-3.397 1.407A1.838 1.838 0 0 0 13.7 8.605m-2.976-2.38a3.338 3.338 0 1 1 2.555 6.168 3.338 3.338 0 0 1-2.555-6.169"
            ></path>
          </svg>
          &nbsp; Location: {hotel.location}
        </p>
        <p className="text-sm font-medium flex items-center mt-1">
          {Array.from({ length: 5 }, (_, index) => {
            const ratingValue = hotel.rating - index;
            return (
              <svg
                key={index}
                height="20px"
                width="20px"
                version="1.1"
                viewBox="0 0 53.867 53.867"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <polygon
                  style={{
                    fill: ratingValue >= 1 ? "#EFCE4A" : ratingValue >= 0.5 ? "url(#half-gradient)" : "#E0E0E0",
                  }}
                  points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
        10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"
                />
                {ratingValue >= 0.5 && ratingValue < 1 && (
                  <defs>
                    <linearGradient id="half-gradient">
                      <stop offset="50%" stopColor="#EFCE4A" />
                      <stop offset="50%" stopColor="#E0E0E0" />
                    </linearGradient>
                  </defs>
                )}
              </svg>
            );
          })}
        </p>
      </div>
      <div className="flex-wrap">
        <div className="w-full py-4">
          <div className="flex flex-wrap mb-6 gap-2">
            {isMobileView ? (
              <Slider {...sliderSettings}>
                {hotel.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Hotel ${index + 1}`}
                      className="w-full h-50 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => openModal(image)}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              hotel.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hotel ${index + 1}`}
                  className="w-full sm:w-1/2 md:w-1/4 h-50 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => openModal(image)}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-center">Room Types</h1>
        </div>
        <div className="w-full py-4 grid grid-cols-2 gap-4">
          {hotel.roomTypes.map((room, roomIndex) => (
            <div key={roomIndex} className="w-full bg-white p-4 rounded-lg shadow-lg shadow-blue-500/40 mb-6 flex">
              <div className="w-1/2 pr-4">
                <h3 className="text-xl font-bold mb-4">{room.type}</h3>
                <div className="flex space-x-2">
                  <img
                    key={0}
                    src={room.images[0]}
                    alt={`${room.type} Main`}
                    className="w-40 h-40 object-cover rounded-lg cursor-pointer shadow-md"
                    onClick={() => openModal(room.images)}
                  />
                  <div className="flex flex-col space-y-2">
                    {room.images.slice(1).map((image, index) => (
                      <img
                        key={index + 1}
                        src={image}
                        alt={`${room.type} Sub ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer shadow-md"
                        onClick={() => openModal(room.images)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-4">
                <p className="text-lg mb-2 font-semibold">
                  Price: <span className=" text-green-500">${room.price}</span>
                </p>
                <p className="text-lg mb-2 font-semibold">Availability: {room.availability}</p>
                <h4 className="text-lg font-semibold mb-2">Amenities Present :</h4>
                <ul className="list-disc pl-5 mb-2">
                  {room.amenities.map((roomAmenity, amenityIndex) => (
                    <li key={amenityIndex} className="text-base">
                      {roomAmenity.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <img src={selectedImage} alt="Full screen" className="max-w-full max-h-full rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
