import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChangePassword = () => {
    // Fiktiv funktion för att hantera lösenordsbyte
    toast.success("Lösenordet har ändrats!");
  };

  const handleLogout = () => {
    // Fiktiv funktion för att logga ut användaren
    setUser(null);
    navigate("/");
    toast.success("Du har loggat ut!");
  };

  return (
    <>
      <div className="w-full h-[16em] md:h-[26em]">
        <img
          src="loginpage.png"
          alt="loginpage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="content-container w-10/12 mx-auto text-center flex flex-col md:items-center py-6">
        {user ? (
          // Om användaren är inloggad, visa användarinformation
          <>
            <h1>Välkommen {user.name}!</h1>
            <p>Här kan du utföra några åtgärder:</p>

            <div className="flex flex-col items-center mt-6">
              <button
                onClick={() => navigate("/myapplications")}
                className="mt-4 w-48 uppercase bg-primary text-white py-2 px-6 rounded-3xl drop-shadow-xl"
              >
                Ansökningar
              </button>
              <button
                onClick={handleChangePassword}
                className="mt-4 w-48 uppercase bg-blue-500 text-white py-2 px-6 rounded-3xl drop-shadow-xl"
              >
                Byt lösenord
              </button>

              <button
                onClick={handleLogout}
                className="mt-4 w-48 uppercase bg-red-500 text-white py-2 px-6 rounded-3xl drop-shadow-xl"
              >
                Logga ut
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default MyProfile;
