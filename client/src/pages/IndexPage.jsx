import React, { useEffect, useState } from "react";
import Filter from "../components/Filter.jsx";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext.jsx";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const IndexPage = () => {
  const { data, filteredData, setData, setFilteredData } = useData();
  const [imageIndexes, setImageIndexes] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setImageIndexes(Array(filteredData.length).fill(0));
    }
  }, [data, filteredData]);

  const showNextImage = (itemIndex) => {
    setImageIndexes((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === itemIndex
          ? (index + 1) % filteredData[itemIndex].images[0].data.length
          : index
      )
    );
  };

  const showPrevImage = (itemIndex) => {
    setImageIndexes((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === itemIndex
          ? (index - 1 + filteredData[itemIndex].images[0].data.length) %
            filteredData[itemIndex].images[0].data.length
          : index
      )
    );
  };

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

        <div className="flex flex-wrap justify-center m-4 mx-auto">
          {filteredData.map((item, index) => (
            <div key={index} className="w-[20rem] m-4 relative ">
              <div className="h-[14rem] relative group">
                <button
                  onClick={() => showPrevImage(index)}
                  className="text-white z-50 absolute left-0 h-full bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowBigLeft />
                </button>
                {item.images.length > 0 && (
                  <img
                    src={item.images[0].data[imageIndexes[index]]}
                    alt={item.title}
                    className="h-full w-full object-cover rounded-xl "
                  />
                )}
                <button
                  onClick={() => showNextImage(index)}
                  className="text-white shadow-2xl fill-primary z-50 absolute top-1/2 transform -translate-y-1/2 right-0 h-full bg-white bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowBigRight />
                </button>
                <div className="absolute flex items-center justify-center bottom-2 w-full">
                  {item.images[0].data.map((_, buttonIndex) => (
                    <button
                      key={buttonIndex}
                      onClick={() => {
                        const indexes = [...imageIndexes];
                        indexes[index] = buttonIndex;
                        setImageIndexes(indexes);
                      }}
                      className={`bg-gray-200 opacity-50 rounded-2xl w-2 h-2 mx-0.5 ${
                        imageIndexes[index] === buttonIndex
                          ? "bg-white-500 scale-150 opacity-[100%] outline-black"
                          : ""
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
              <Link
                key={index}
                to={`/listings/${item._id}`}
                className="relative z-10"
              >
                <div className="flex justify-between font-bold">
                  {item.street} {item.streetNumber} <span>{item.area}</span>
                </div>
                <div className="flex justify-between my-2">
                  {item.price} kr/mån <span>BRF</span>
                </div>
                <div className="flex justify-between">
                  {item.rooms} RoK <span>{item.size}m²</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
