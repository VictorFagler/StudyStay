import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import About from "./pages/About";
import RentOut from "./pages/RentOut";
import Register from "./pages/Register";
import axios from "axios";
import MyProfile from "./pages/MyProfile";
import ListingDetails from "./pages/ListingDetails";
import { DataProvider } from "./context/DataContext";
import { UserContext } from "../context/userContext";
import ApplicationPage from "./pages/ApplicationPage";
import UserApplication from "./pages/MyApplication";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  // const [data] = [];
  // const { user } = useContext(UserContext);

  return (
    <div className="App">
      <div className="main-content min-h-[100vh] mb-6">
        <DataProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" index element={<IndexPage />} />
            <Route path="/about" index element={<About />} />
            <Route path="/rentout" index element={<RentOut />} />
            <Route path="/register" index element={<Register />} />
            <Route path="/login" index element={<Login />} />
            <Route path="/profile" index element={<MyProfile />} />
            <Route
              path="/application/:id"
              index
              element={<ApplicationPage />}
            />
            <Route path="/listings/:id" index element={<ListingDetails />} />
            <Route path="/myapplications" element={<UserApplication />} />
          </Routes>
        </DataProvider>
      </div>
    </div>
  );
}

export default App;
