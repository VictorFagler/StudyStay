import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useLocation } from "react-router-dom";

const AcceptedPayment = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const acceptedObject = location.state?.acceptedObject;
  const Navigate = useNavigate();

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  return (
    <>
      <div className="flex w-full h-[14em] md:h-[24em] overflow-hidden">
        <img src="/keys2.jpg" alt="loginpage" className="w-full object-cover" />
      </div>
      <div className="mx-auto lg:w-10/12 md:flex flex-row-reverse px-4 py-10 ">
        <div className="flexlg:w-8/12">
          <div className="py-4">
            <h1 className="text-2xl md:text-4xl lg:text-4xl lg:w-8/12">
              Grattis {user?.name}! Här är ditt nya boende.
            </h1>
          </div>
          <div className="w-10/12 py-10 lg:w-8/12">
            <p>
              Säkerställ noggrant att all information nedan är korrekt. Vi
              önskar dig all lycka med ditt nya boende och dina studier!
              <div className=" justify-center pb-10 hidden md:block md:py-16">
                <button
                  onClick={() => Navigate("/")}
                  className="mt-4 w-48 uppercase bg-primary text-white py-2 px-6 rounded-3xl drop-shadow-xl"
                >
                  HOME
                </button>
              </div>
            </p>
          </div>
        </div>
        <div className=" mx-auto mt-6 md:flex ">
          <div className=" md:mx-6 md:w-[30em]">
            <div className="flex justify-center items-center h-[20em] ">
              <img
                src={acceptedObject?.images[0].data}
                alt="image"
                className="rounded-2xl h-full md:h-[20em] w-full object-cover"
              ></img>
            </div>
            <div className="översikt px-4 pt-4 pb-10 flex-col space-y-2 ">
              <p className="flex justify-between font-bold">
                {acceptedObject.street} {acceptedObject.streetNumber}{" "}
                <span className="font-normal">{acceptedObject.area}</span>
              </p>
              <p className="flex justify-between">
                {acceptedObject.price} kr/mån <span>Brf</span>
              </p>
              <p className="flex justify-between">
                {acceptedObject.rooms} kr/mån{" "}
                <span>{acceptedObject.size} kvm</span>
              </p>
            </div>
            <div className="flex justify-center pb-10 md:hidden">
              <button
                onClick={() => Navigate("/")}
                className="mt-4 w-48 uppercase bg-primary text-white py-2 px-6 rounded-3xl drop-shadow-xl"
              >
                HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptedPayment;
