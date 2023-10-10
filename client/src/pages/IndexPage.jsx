import React from "react";
import HouseCard from "../components/HouseCard";
import Filter from "../components/Filter.jsx";

const IndexPage = () => {
  return (
    <>
      <div>
        <div className="relative w-full">
          <img
            src="banner.png"
            alt="banner"
            className="w-full md:max-h-[40em]"
          />
          <div className="around absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl sm:text-4xl text-brown-50 drop-shadow lg:text-6xl ">
              Hitta din nya studentbostad
            </h2>
            <button className="lg:text-1xl lg:mt-20 px-4 py-1 mt-8 mb-1 rounded-lg text-brown-50 bg-orange-900 drop-shadow-2xl hover:bg-orange-900">
              Ansök idag
            </button>
          </div>
        </div>
        <div>
          <Filter />
        </div>
        <div className="">
          <HouseCard />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
