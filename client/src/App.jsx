import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import About from "./pages/About";
import RentOut from "./pages/RentOut";
import Register from "./pages/Register";
import axios from "axios";
import MyProfile from "./pages/MyProfile";
import ListingDetails from "./pages/listingDetails";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  const [data] = [];

  return (
    <div className="App">
      <div className="main-content">
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/about" index element={<About />} />
          <Route path="/rentout" index element={<RentOut />} />
          <Route path="/register" index element={<Register />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/profile" index element={<MyProfile />} />
          <Route
            path="/listings/:id"
            element={<ListingDetails data={data} />} // Pass data as a prop
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
