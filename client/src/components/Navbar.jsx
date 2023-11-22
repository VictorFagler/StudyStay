import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { UserContext } from "../../context/userContext";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = (event) => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Function to handle logout
  const logoutHandler = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/login");
      console.log("Logging out...");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <nav className="bg-white relative">
      <div className="flex justify between items-center text-black py-5 px-8">
        <div className="flex items-center">
          <Link to="/" className="absolute">
            <img src="/studystay-logo.png" alt="Logo" className="scale-75" />
          </Link>
        </div>

        <ul className="flex space-x-8 text-xl ml-auto">
          <li>
            <Link to="/about" className="text-black hidden md:flex">
              Om oss
            </Link>
          </li>
          <li>
            <Link to="/rentout" className="text-black hidden md:flex">
              Hyr ut
            </Link>
          </li>
          <li>
            <button
              onClick={toggleProfileMenu}
              className="text-black focus:outline-none"
            >
              <div className="profile-menu flex flex-wrap">
                <AiOutlineMenu size={24} className="my-1" />
                <FaUserCircle
                  size={32}
                  className="fill-orange-800 bg-white ms-2"
                />
              </div>
            </button>
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute bg-white border border-t-0 border-gray-300 shadow w-full md:w-80"
                style={{ right: "0", top: "100%", zIndex: 9999 }}
              >
                <ul className=" md:w-80 px-10 py-8 text-center">
                  <li className="py-3">
                    <Link
                      to="/profile"
                      className="text-black"
                      onClick={toggleProfileMenu}
                    >
                      Min profil
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link
                      to="/"
                      className="text-black"
                      onClick={toggleProfileMenu}
                    >
                      Bostäder
                    </Link>
                  </li>
                  <li
                    className="border-t-2 border-gray-300 py-3"
                    onClick={toggleProfileMenu}
                  >
                    <Link to="/myapplications" className="text-black">
                      Ansökningar
                    </Link>
                  </li>
                  <li
                    className="border-t-2 border-gray-300 py-3"
                    onClick={toggleProfileMenu}
                  >
                    <Link to="/" className="text-black">
                      Kontakt
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link
                      to="/"
                      className="text-black"
                      onClick={toggleProfileMenu}
                    >
                      Villkor
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link
                      to="/rentout"
                      className="text-black"
                      onClick={toggleProfileMenu}
                    >
                      Hyr ut
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link
                      to="/about"
                      className="text-black"
                      onClick={toggleProfileMenu}
                    >
                      Om oss
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    {user ? (
                      <div>
                        <button
                          className="text-white text-sm bg-[#E78121] rounded-2xl px-8 py-2 uppercase"
                          onClick={logoutHandler}
                        >
                          Logga ut
                        </button>
                        <p className="text-xs pt-1">Inloggad som {user.name}</p>
                      </div>
                    ) : (
                      <Link to="/login">
                        <button
                          className="text-white text-sm bg-[#E78121] rounded-2xl px-8 py-2 uppercase"
                          onClick={toggleProfileMenu}
                        >
                          Logga in
                        </button>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
