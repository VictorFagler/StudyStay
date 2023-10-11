import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
// import { BsHouseDoor } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
import axios from "axios";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log("User in Navbar (before logout):", user);
  }, [user]);
  useEffect(() => {
    console.log("Navbar re-rendered with user:", user);
  }, [user]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Function to handle logout
  const logoutHandler = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
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
            <img src="studystay-logo.png" alt="Logo" className="scale-75" />
          </Link>
        </div>
        <div className="lg:hidden mt-2">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none"
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
        <ul
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:flex lg:space-x-8 text-xl ml-auto`}
        >
          <li>
            <Link to="/about" className="text-black">
              Om oss
            </Link>
          </li>
          <li>
            <Link to="/rentout" className="text-black">
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
                className="absolute bg-white border border-t-0 border-gray-300 shadow"
                style={{ right: "0", top: "100%", zIndex: 9999 }}
              >
                <ul className="w-80 px-10 py-8 text-center">
                  <li className="py-3">
                    <Link to="/profile" className="text-black">
                      Min profil
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/" className="text-black">
                      Bostäder
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/" className="text-black">
                      Ansökningar
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/" className="text-black">
                      Kontakt
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/" className="text-black">
                      Villkor
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/rentout" className="text-black">
                      Hyr ut
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-300 py-3">
                    <Link to="/about" className="text-black">
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
                      </div>
                    ) : (
                      <Link to="/login">
                        <button className="text-white text-sm bg-[#E78121] rounded-2xl px-8 py-2 uppercase">
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
