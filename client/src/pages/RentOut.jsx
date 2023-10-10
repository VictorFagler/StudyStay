import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  BsHouseDoor,
  BsBuildings,
  BsDoorOpen,
  BsPeople,
  BsFilterLeft,
} from "react-icons/Bs";

const FilterModal = () => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [numFloors, setNumFloors] = useState("");
  const [accommodationType, setAccommodationType] = useState("Lägenhet");
  const [amenities, setAmenities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Min Amount:", minAmount);
    console.log("Max Amount:", maxAmount);
    console.log("Number of Rooms:", numRooms);
    console.log("Number of Bathrooms:", numBathrooms);
    console.log("Accommodation Type:", accommodationType);
    console.log("Selected Amenities:", amenities);
  };

  const handleAmenitiesChange = (e) => {
    const amenity = e.target.value;
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const clearFilters = () => {
    setMinAmount("");
    setMaxAmount("");
    setNumRooms("");
    setNumBathrooms("");
    setAccommodationType("");
    setAmenities([]);
  };

  return (
    <React.Fragment>
      <div className="bg-white rounded-3xl md:max-w-6xl mx-auto">
        <div className="relative border-b-2 border-gray-300 py-2 center">
          <h2 className="text-2xl text-center">Hyr ut</h2>
        </div>

        <form id="form" onSubmit={handleSubmit} className="flex flex-col">
          <div className=" house-type px-4  py-4 border-b-2 border-gray-300">
            <h3 id="form-prompt" className="font-bold text-lg">
              Boendetyp
            </h3>
            <p className="text-sm pb-4">
              Välj vilken typ av boende du vill hyra ut
            </p>

            {/* BOENDETYP VAL */}
            <div className="accommodation-options flex flex-col md:flex-row justify-center md:px-10">
              <button
                className={`accommodation-button ${
                  accommodationType === "Lägenhet" ? "selected" : ""
                } p-2 border w-full rounded-t-xl  border-gray-400 md:border-l-xl
                      md:rounded-l-xl md:rounded-r-none`}
                onClick={() => setAccommodationType("Lägenhet")}
              >
                Lägenhet
              </button>
              <button
                className={`accommodation-button ${
                  accommodationType === "Hus" ? "selected" : ""
                } p-2 border w-full px-4 border-gray-400`}
                onClick={() => setAccommodationType("Hus")}
              >
                Hus
              </button>
              <button
                className={`accommodation-button ${
                  accommodationType === "Korridor" ? "selected" : ""
                } p-2 border w-full px-4 border-gray-400 `}
                onClick={() => setAccommodationType("Korridor")}
              >
                Korridor
              </button>
              <button
                className={`accommodation-button ${
                  accommodationType === "Rum" ? "selected" : ""
                } p-2 border w-full rounded-b-xl border-gray-400 
                      md:rounded-r-xl md:rounded-l-none`}
                onClick={() => setAccommodationType("Rum")}
              >
                Rum
              </button>
            </div>
          </div>

          <div className="flex flex-col px-4 py-4 border-b-2 border-gray-300">
            <div>
              <h4 className="font-bold text-lg ">Adress</h4>
            </div>
            <div className="my-2">
              <p className="text-sm">Gata</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="street"
                name="street"
                value={minAmount}
                placeholder="Strandvägen"
                onChange={(e) => setMinAmount(e.target.value)}
              />

              <p className="text-sm">Nummer</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="street"
                name="street"
                value={minAmount}
                placeholder="19B"
                onChange={(e) => setMinAmount(e.target.value)}
              />

              <p className="text-sm">Stad</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="street"
                name="street"
                value={minAmount}
                placeholder="Stockholm"
                onChange={(e) => setMinAmount(e.target.value)}
              />

              <p className="text-sm">Postnummer</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="street"
                name="street"
                value={minAmount}
                placeholder="132 31"
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="minmax flex flex-col px-4 py-4 border-b-2 border-gray-300">
            <div>
              <h4 className="font-bold text-lg ">Pris</h4>
            </div>
            <p className="text-sm">Månadshyra</p>
            <div className="flex flex-col justify-center my-2">
              <input
                className="border-2 rounded px-2 py-1"
                type="number"
                id="minAmount"
                name="minAmount"
                value={minAmount}
                placeholder="Kr 3000"
                onChange={(e) => setMinAmount(e.target.value)}
              />
              <p className="text-sm">Uthyrningsperiod</p>
              <input
                className="border-2 rounded px-2 py-1"
                type="number"
                id="minAmount"
                name="minAmount"
                value={minAmount}
                placeholder="Jan - Dec"
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="minmax flex flex-col px-4 py-4 border-b-2 border-gray-300">
            <div>
              <h4 className="font-bold text-lg ">Beskrvining</h4>
            </div>
            <textarea className="text-sm w-full h-40 border"></textarea>
            <div className="flex flex-col justify-center my-2"></div>
          </div>
          <div className="border-b-2 border-gray-300">
            <div className="rooms px-4 py-4 ">
              <h4 className="font-bold text-lg">Antal rum</h4>
              <p className="text-sm pb-1">Sovrum</p>
              <div className="room-options flex flex-wrap justify-center">
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index}
                    className={`room-button ${
                      numRooms === index + 1 ? "selected" : ""
                    } px-5 py-1 mr-1 mb-1 rounded-xl border border-gray-300 min-w-[60px] h-[35px] w-[68px]`}
                    onClick={() => setNumRooms(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <p className="text-sm mt-4 pb-1">Badrum</p>
              <div className="bathroom-options flex flex-wrap justify-center">
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index}
                    className={`bathroom-button ${
                      numBathrooms === index + 1 ? "selected" : ""
                    } px-5 py-1 mr-1 mb-1 rounded-xl border border-gray-300 min-w-[60px] h-[35px] w-[68px]`}
                    onClick={() => setNumBathrooms(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <p className="text-sm mt-4 pb-1">Våning</p>
              <div className="floor-options flex flex-wrap justify-center">
                {[...Array(24)].map((_, index) => (
                  <button
                    key={index}
                    className={`floor-button ${
                      numFloors === index + 1 ? "selected" : ""
                    } px-5 py-1 mr-1 mb-1 rounded-xl border border-gray-300 min-w-[60px] h-[35px] w-[68px]`}
                    onClick={() => setNumFloors(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* BEKVÄMLIGHETER */}

            <div className="amenities px-4 py-4">
              <h4 className="font-bold text-lg">Bekvämligheter</h4>
              <p className="text-sm pb-2">
                Välj alternativ som finns i ditt boende
              </p>
              <div className="amenities-options grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Wifi"
                    checked={amenities.includes("Wifi")}
                    onChange={handleAmenitiesChange}
                  />
                  Wifi
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Kök"
                    checked={amenities.includes("Kök")}
                    onChange={handleAmenitiesChange}
                  />
                  Kök
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Tväggstuga/tvättmaskin"
                    checked={amenities.includes("Tväggstuga/tvättmaskin")}
                    onChange={handleAmenitiesChange}
                  />
                  Tvättmaskin
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Tv"
                    checked={amenities.includes("Tv")}
                    onChange={handleAmenitiesChange}
                  />
                  Tv
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Dedikerad arbetsyta"
                    checked={amenities.includes("Dedikerad arbetsyta")}
                    onChange={handleAmenitiesChange}
                  />
                  Dedikerad arbetsyta
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Parkering"
                    checked={amenities.includes("Parkering")}
                    onChange={handleAmenitiesChange}
                  />
                  Parkering
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Balkong"
                    checked={amenities.includes("Balkong")}
                    onChange={handleAmenitiesChange}
                  />
                  Balkong
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="Hiss"
                    checked={amenities.includes("Hiss")}
                    onChange={handleAmenitiesChange}
                  />
                  Hiss
                </label>
              </div>
            </div>
          </div>
          <div className="bilder">
            <h4>Ladda upp bilder</h4>
            <input type="file" accept="image/jpeg, image/png, image/jpg" />
            <output></output>
          </div>
          <div
            className="flex justify-between px-4
                 py-3"
          >
            <button
              className="underline font-bold"
              onClick={() => clearFilters()}
            >
              Rensa alla
            </button>
            <button
              type="submit"
              className="bg-orange-600 rounded-xl px-4 py-0.5 flex justify-center text-white"
            >
              Lista boende
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default FilterModal;
