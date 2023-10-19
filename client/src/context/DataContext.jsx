// DataContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setData(res);
          setFilteredData(res);
        } else {
          console.error("API did not return an array of data:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{ data, filteredData, setData, setFilteredData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
