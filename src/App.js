import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SearchHotel from "./components/SearchHotel";
import UpdateHotel from "./components/UpdateHotelData";
import DeleteHotel from "./components/DelHotel";
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
          <Route path="/search" element={<SearchHotel />} />
          <Route path="/hotel/:hotelId" element={<HotelDetails />} />
          <Route element={<PrivateRoute roles={["admin"]} />}>
            <Route path="/add" element={<AddHotel />} />
            <Route path="/update/:hotelId" element={<UpdateHotel />} />
            <Route path="/delete" element={<DeleteHotel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
