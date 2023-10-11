import React from "react";
import { BsHouseDoor, BsBuildings, BsDoorOpen, BsPeople } from "react-icons/Bs";
import FilterModal from "./modals/FilterModal";

const Filter = () => {
  return (
    <div className="flex flex-row justify-between mx-8 mt-6 md:max-w-lg md:mx-auto">
      <button className="flex flex-col items-center text-center">
        <BsHouseDoor size={32} />
        <p className="text-xs py-1">Hus</p>
      </button>
      <button className="flex flex-col items-center text-center">
        <BsBuildings size={32} />
        <p className="text-xs py-1">Lägenhet</p>
      </button>
      <button className="flex flex-col items-center text-center">
        <BsDoorOpen size={32} />
        <p className="text-xs py-1">Rum</p>
      </button>
      <button className="flex flex-col items-center text-center">
        <BsPeople size={32} />
        <p className="text-xs py-1">Kollektiv</p>
      </button>
      <FilterModal />
    </div>
  );
};

export default Filter;
