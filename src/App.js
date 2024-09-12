import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import UpdateHotel from "./components/UpdateHotelData";
import AddHotel from "./components/AddHotel";
import HomePage from "./components/Home";
import HotelDetails from "./components/HotelDetails";
import { AuthProvider } from "./service/AuthProvider";
import PrivateRoute from "./service/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hotel/:hotelId" element={<HotelDetails />} />
          <Route element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/add" element={<AddHotel />} />
            <Route path="/update" element={<UpdateHotel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
