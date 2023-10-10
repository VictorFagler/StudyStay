import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/Bs";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const logoutHandler = () => {
    // Add your logout logic here, e.g., clearing user session, redirecting, etc.
    console.log("Logging out...");
  };

  // Create a ref for the profile menu to check if it was clicked
  const profileMenuRef = useRef(null);

  // Close the profile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    // Add the event listener when the profile menu is open
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <nav className="bg-white relative">
      <div className="flex justify-between items-center text-black py-5 px-8">
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
            <Link to="/rentout" className="text-black flex mx-8">
              Hyr ut <BsHouseDoor size={16} className="mt-2 ml-2" />
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
                ref={profileMenuRef} // Set the ref for the profile menu
                className="absolute bg-white border border-t-0 border-gray-300 shadow"
                style={{ right: "0", top: "100%", zIndex: 9999 }}
              >
                <ul className="w-80 px-10 py-8 text-center">
                  <li className="py-3">
                    <Link to="/" className="text-black">
                      Min profil
                    </Link>
                  </li>
                  <li className="border-t-2  border-gray-300 py-3">
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
                  <li className="border-t-2 border-gray-300 py-3 w-full">
                    <Link to="/" className="text-black">
                      Hyr ut
                    </Link>
                  </li>
                  <li className="border-t-2  border-gray-300 py-3">
                    <button
                      className=" text-white text-sm bg-[#E78121] rounded-2xl px-8 py-2 uppercase"
                      onClick={logoutHandler}
                    >
                      Logga ut
                    </button>
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
