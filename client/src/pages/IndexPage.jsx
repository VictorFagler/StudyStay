import React, { useEffect, useState } from "react";
import Filter from "../components/Filter.jsx";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext.jsx";

const IndexPage = () => {
  const { data, filteredData, setData, setFilteredData } = useData();

  const filterData = (filterCriteria) => {
    const filtered = data.filter((item) => {
      return (
        (!filterCriteria.minAmount || item.price >= filterCriteria.minAmount) &&
        (!filterCriteria.maxAmount || item.price <= filterCriteria.maxAmount) &&
        (!filterCriteria.numRooms || item.rooms === filterCriteria.numRooms) &&
        (!filterCriteria.unitType ||
          item.unitType === filterCriteria.unitType) &&
        (!filterCriteria.amenities.length === 0 ||
          filterCriteria.amenities.every((amenity) =>
            item.amenities.includes(amenity)
          )) &&
        (!filterCriteria.searchText ||
          item.street
            .toLowerCase()
            .includes(filterCriteria.searchText.toLowerCase()) ||
          item.city
            .toLowerCase()
            .includes(filterCriteria.searchText.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  };

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
            <h2 className="text-4xl sm:text-4xl text-brown-50 drop-shadow lg:text-6xl">
              Hitta din nya studentbostad
            </h2>
            <button className="lg:text-1xl lg:mt-20 px-4 py-1 mt-8 mb-1 rounded-lg text-brown-50 bg-orange-900 drop-shadow-2xl hover:bg-orange-900">
              Ansök idag
            </button>
          </div>
        </div>
        <div>
          <Filter onFilter={filterData} />
        </div>

        <div className="flex flex-wrap w-30 h-30 justify-center m-4 w-7/12 mx-auto">
          {filteredData.map((item, index) => (
            <Link key={index} to={`/listings/${item._id}`}>
              <div key={index} className="w-[14rem] m-4">
                <div className="h-[14rem]">
                  {item.images.length > 0 && (
                    <img
                      src={`data:${item.images[0].contentType};${item.images[0].data[0]}`}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  )}
                </div>
                <div className="flex justify-between font-bold">
                  {item.street} {item.streetNumber} <span>{item.area}</span>
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
    </>
  );
};

export default IndexPage;
