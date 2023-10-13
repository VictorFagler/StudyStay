import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ListingDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/listings/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        if (res) {
          setItem(res);
        } else {
          // Handle the case where the item is not found
          setItem(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setItem(null);
      });
  }, [id]);

  if (item === null) {
    return <div>Item not found</div>;
  }

  // Split the images into two arrays
  const firstFourImages = item.images[0].data.slice(0, 4);
  const restOfImages = item.images[0].data.slice(4);

  return (
    <>
      <div className="firstFourImages flex w-11/12 mx-auto">
        <div className="flex flex-row">
          {firstFourImages.slice(0, 2).map((imageData, index) => (
            <div className="mx-auto border 4">
              <img
                className="`w-full h-full cursor-pointer p-1"
                key={index}
                src={`data:${item.images[0].contentType};${imageData}`}
                alt={`Image`}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {firstFourImages.slice(2, 4).map((imageData, index) => (
            <img
              className="w-46 h-full cursor-pointer p-1"
              key={index}
              src={`data:${item.images[0].contentType};${imageData}`}
              alt={`img`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Additional Images</h2>
        <div className="AdditionImages flex w-11/12 mx-auto border-4 border-red-200">
          {restOfImages.map((imageData, index) => (
            <div className="flex m-1">
              <img
                className="flex fill cursor-pointer"
                key={index}
                src={`data:${item.images[0].contentType};${imageData}`}
                alt={"img"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
