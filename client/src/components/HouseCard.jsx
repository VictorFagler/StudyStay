import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

export default function HouseCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make the API request
    fetch("https://dummyjson.com/products?&limit=10")
      .then((res) => res.json())
      .then((responseData) => {
        if (Array.isArray(responseData.products)) {
          setData(responseData.products);
        } else {
          console.error(
            "API did not return an array of products:",
            responseData
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap w-30 h-30 justify-center m-4">
      {data.map((item, index) => (
        <Card key={index} className="max-w-[20rem] shadow-lg max-h-[24rem]">
          <CardHeader floated={false} color="blue-gray">
            <div className="relative h-44 w-full">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="to-bg-black-10 absolute inset-0 w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            </div>
            {/* Add other CardHeader content */}
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium truncate w-36"
              >
                {item.title}
              </Typography>
              <Typography
                color="blue-gray"
                className="flex items-center gap-1.5 font-normal"
              >
                {/* Use item.rating or any other property */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-0.5 h-5 w-5 text-yellow-700"
                >
                  {/* Rating SVG */}
                </svg>
                {item.rating}
              </Typography>
            </div>
            <Typography color="gray" className="truncate">
              {item.description}
            </Typography>
            {/* Add other CardBody content */}
          </CardBody>
          <CardFooter className="pt-3">
            <Button size="sm" fullWidth={true} className="bg-orange-900">
              Reserve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
