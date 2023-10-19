import React, { useState } from "react";
import { BsHouseDoor, BsBuildings, BsDoorOpen, BsPeople } from "react-icons/Bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsFilterLeft } from "react-icons/Bs";

const Filter = ({ onFilter, handleFilter }) => {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [unitType, setUnitType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);

  const [filterCriteria, setFilterCriteria] = useState({
    unitType: "",
    minAmount: "",
    maxAmount: "",
    numRooms: "",
    amenities: [],
  });

  const handleAmenitiesChange = (e) => {
    const amenity = e.target.value;
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCriteria = {
      minAmount,
      maxAmount,
      numRooms,
      unitType,
      amenities,
      searchText,
    };
    onFilter(filterCriteria);
  };

  const clearFilters = () => {
    setMinAmount("");
    setMaxAmount("");
    setNumRooms("");
    setUnitType("");
    setAmenities([]);
    setSearchText("");
  };

  return (
    <div className="flex flex-row w-6/12 mx-auto mt-6">
      <button
        onClick={() => {
          if (unitType === "Hus") {
            setUnitType(""); // Toggle unitType to an empty string
            onFilter({
              ...filterCriteria,
              unitType: "",
            });
          } else {
            setUnitType("Hus"); // Set unitType to "Hus" if it's not already
            onFilter({
              ...filterCriteria,
              unitType: "Hus",
            });
          }
        }}
        className={`flex flex-col items-center text-center py-1 w-1/5 ${
          unitType === "Hus" ? "selected rounded-xl" : ""
        }`}
      >
        <BsHouseDoor size={32} />
        <p className="text-xs py-1">Hus</p>
      </button>
      <button
        onClick={() => {
          if (unitType === "Lägenhet") {
            setUnitType(""); // Toggle unitType to an empty string
            onFilter({
              ...filterCriteria,
              unitType: "",
            });
          } else {
            setUnitType("Lägenhet"); // Set unitType to "Hus" if it's not already
            onFilter({
              ...filterCriteria,
              unitType: "Lägenhet",
            });
          }
        }}
        className={`flex flex-col items-center text-center px-2 py-1  w-1/5 ${
          unitType === "Lägenhet" ? "selected rounded-xl" : ""
        }`}
      >
        <BsBuildings size={32} />
        <p className="text-xs py-1">Lägenhet</p>
      </button>
      <button
        onClick={() => {
          if (unitType === "Rum") {
            setUnitType(""); // Toggle unitType to an empty string
            onFilter({
              ...filterCriteria,
              unitType: "",
            });
          } else {
            setUnitType("Rum"); // Set unitType to "Hus" if it's not already
            onFilter({
              ...filterCriteria,
              unitType: "Rum",
            });
          }
        }}
        className={`flex flex-col items-center text-center px-2 py-1 w-1/5 ${
          unitType === "Rum" ? "selected rounded-xl" : ""
        }`}
      >
        <BsDoorOpen size={32} />
        <p className="text-xs py-1">Rum</p>
      </button>
      <button
        onClick={() => {
          if (unitType === "Kollektiv") {
            setUnitType(""); // Toggle unitType to an empty string
            onFilter({
              ...filterCriteria,
              unitType: "",
            });
          } else {
            setUnitType("Kollektiv"); // Set unitType to "Hus" if it's not already
            onFilter({
              ...filterCriteria,
              unitType: "Kollektiv",
            });
          }
        }}
        className={`flex flex-col items-center text-center px-2 py-1 w-1/5 ${
          unitType === "Kollektiv" ? "selected rounded-xl" : ""
        }`}
      >
        <BsPeople size={32} />
        <p className="text-xs py-1">Kollektiv</p>
      </button>
      <Button
        onClick={handleShow}
        className="flex flex-col items-center text-center px-2 py-1 w-1/5 "
      >
        <BsFilterLeft size={32} />
        <p className="text-xs py-1">Filter</p>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="md:max-w-3xl mx-auto">
          <div className="centered-modal bg-white rounded-3xl">
            <div className="bg-white rounded-3xl">
              <div className="relative border-b-2 border-gray-300 py-2 center">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-7 font-bold"
                >
                  X
                </button>
                <h2 className="text-2xl text-center">Filter</h2>
              </div>

              <form
                id="rentform"
                name="rentform"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                <div className=" house-type px-4  py-4 border-b-2 border-gray-300">
                  <h3 id="form-prompt" className="font-bold text-lg">
                    Boendetyp
                  </h3>
                  <p className="text-sm pb-4">
                    Sök efter rum, hela boenden eller andra typer av boenden.
                  </p>

                  {/* BOENDETYP VAL */}
                  <div className="accommodation-options flex flex-col md:flex-row justify-center md:px-10">
                    <button
                      className={`accommodation-button ${
                        unitType === "Lägenhet" ? "selected" : ""
                      } p-2 border w-full rounded-t-xl  border-gray-400 md:border-l-xl
                      md:rounded-l-xl md:rounded-r-none`}
                      onClick={() => setUnitType("Lägenhet")}
                    >
                      Lägenhet
                    </button>
                    <button
                      className={`accommodation-button ${
                        unitType === "Hus" ? "selected" : ""
                      } p-2 border w-full px-4 border-gray-400`}
                      onClick={() => setUnitType("Hus")}
                    >
                      Hus
                    </button>
                    <button
                      className={`accommodation-button ${
                        unitType === "Korridor" ? "selected" : ""
                      } p-2 border w-full px-4 border-gray-400 `}
                      onClick={() => setUnitType("Korridor")}
                    >
                      Korridor
                    </button>
                    <button
                      className={`accommodation-button ${
                        unitType === "Rum" ? "selected" : ""
                      } p-2 border w-full rounded-b-xl border-gray-400 
                      md:rounded-r-xl md:rounded-l-none`}
                      onClick={() => setUnitType("Rum")}
                    >
                      Rum
                    </button>
                  </div>
                </div>

                <div className="minmax flex flex-col px-4 py-4 border-b-2 border-gray-300">
                  <div>
                    <h4 className="font-bold text-lg ">Prisintervall</h4>
                    <p className="text-sm">Månadshyra</p>
                  </div>
                  <div className="flex flex-col justify-center my-2 md:flex-row">
                    <input
                      className="border-2 rounded px-2 py-1"
                      type="number"
                      id="minAmount"
                      name="minAmount"
                      value={minAmount}
                      placeholder="Kr 3000"
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                    <p className="px-2 flex items-center">-</p>
                    <input
                      className="border-2 rounded px-2 py-1"
                      type="number"
                      id="maxAmount"
                      name="maxAmount"
                      placeholder="Kr 7000"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="search-field flex flex-col px-4 py-4 border-b-2 border-gray-300">
                  <h4 className="font-bold text-lg">Sök</h4>
                  <input
                    className="border-2 rounded px-2 py-1"
                    type="text"
                    value={searchText}
                    placeholder="Sök boenden"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="border-b-2 border-gray-300">
                  <div className="rooms px-4 py-4 ">
                    <h4 className="font-bold text-lg">Antal rum</h4>
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
                  </div>

                  {/* BEKVÄMLIGHETER */}

                  <div className="amenities px-4 py-4">
                    <h4 className="font-bold text-lg">Bekvämligheter</h4>
                    <p className="text-sm pb-2">Välj alternativ</p>
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
                          id="kök"
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
                    onClick={handleClose}
                    className="bg-orange-600 rounded-xl px-4 py-0.5 flex justify-center text-white"
                  >
                    Visa boenden
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Filter;
