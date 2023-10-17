import { React, useEffect, useState } from "react";
// import HouseCard from "../components/HouseCard";
import Filter from "../components/Filter.jsx";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API request to fetch your MongoDB data
    fetch("http://localhost:5000/listings") // Replace with your API endpoint
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setData(res);
        } else {
          console.error("API did not return an array of data:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          <div className="flex flex-wrap w-30 h-30 justify-center m-4">
            {data.map((item, index) => (
              <Link key={index} to={`/listings/${item._id}`}>
                <div key={index} className="w-[18rem] h-[26rem] m-4">
                  <div className=" h-[12rem] w-full">
                    {item.images.length > 0 && (
                      <img
                        src={`data:${item.images[0].contentType};${item.images[0].data[0]}`}
                        alt={item.title}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                  <div className="flex justify-between font-bold ">
                    {item.street} {item.streetNumber} <span>{item.city}</span>
                  </div>
                  <div className="flex justify-between my-2">
                    {item.price} kr/mån <span>BRF</span>
                  </div>
                  <div className="flex justify-between">
                    {item.rooms} RoK <span>{item.size}m² </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
