import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiWifi, BiSolidParking } from "react-icons/Bi";
import {
  PiCookingPot,
  PiTelevisionSimpleBold,
  PiElevatorDuotone,
} from "react-icons/Pi";
import { GiWashingMachine } from "react-icons/Gi";
import { BsPersonWorkspace } from "react-icons/Bs";
import { MdBalcony } from "react-icons/Md";
import { AiFillStar } from "react-icons/Ai";

const ListingDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null);
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const dateFromDatabase = new Date(item.date);
  const formattedDate = dateFromDatabase.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const moveInDate = new Date(item.date);
  moveInDate.setMonth(moveInDate.getMonth() - 3);
  const formattedMoveInDate = moveInDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const firstFourImages = item.images[0].data.slice(0, 4);
  const restOfImages = item.images[0].data.slice(4);

  const amenityIcons = {
    Wifi: <BiWifi size={32} />,
    Kök: <PiCookingPot size={32} />,
    Tvättmaskin: <GiWashingMachine size={32} />,
    Tv: <PiTelevisionSimpleBold size={32} />,
    Arbetsyta: <BsPersonWorkspace size={32} />,
    Parkering: <BiSolidParking size={32} />,
    Balkong: <MdBalcony size={32} />,
    Hiss: <PiElevatorDuotone size={32} />,
  };
  return (
    <>
      <div className="container w-11/12 mx-auto">
        <div className="firstFourImages flex w-10/12 h-full mx-auto justify-center items-center">
          <div className="flex flex-row">
            {firstFourImages.slice(0, 2).map((imageData, index) => (
              <div key={index} className="w-full h-full">
                <img
                  className="p-1 fill rounded-2xl"
                  src={`data:${item.images[0].contentType};${imageData}`}
                  alt={`Image`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {firstFourImages.slice(2, 4).map((imageData, index) => (
              <div key={index}>
                <img
                  className="p-1 fill max-w-full max-h-full rounded-xl"
                  src={`data:${item.images[0].contentType};${imageData}`}
                  alt={`img`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="housingDetails flex w-8/12 mx-auto justify-between my-6">
          <div>
            <p>Street</p>
            <p>
              {item.street} {item.streetNumber}
            </p>
          </div>
          <div>
            <p>Hyra</p>
            <p>{item.price} kr/mån</p>
          </div>
          <div>
            <p>Rum</p>
            <p>{item.rooms} rum</p>
          </div>
          <div>
            <p>Kvadrat</p>
            <p>{item.size} m²</p>
          </div>
          <div>
            <p>Datum</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p>Typ</p>
            <p>{item.unitType}</p>
          </div>
        </div>

        <div>
          {/* <h2>Additional Images</h2> */}
          <div className="AdditionImages flex w-10/12 mx-auto justify-center items-center">
            {restOfImages.map((imageData, index) => (
              <div key={index} className="flex m-1 px-2">
                <img
                  className="flex fill cursor-pointer rounded-xl"
                  src={`data:${item.images[0].contentType};${imageData}`}
                  alt={"img"}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" mx-auto mt-8 flex justify-center">
          <div className="w-7/12 flex-start pr-16">
            <h1 className="text-4xl">
              {item.street} {item.streetNumber}
            </h1>
            <h2 className="mt-2 italic text-gray-600">
              {item.price}kr/mån | {item.rooms} RoK | {item.size}m²
            </h2>
            <p className="my-8">
              {" "}
              Välkommen till Ufsparregatan i Lunden! Här finns nu en ljus och
              välplanerad lägenhet i fastighet som stod klar för inflyttning i
              lutet av 2018. I nära anslutning till porten finns allmänna
              kommunikationer som tar dig till city på några minuter. Från
              Redbergsplatsen går även flera spårvagnar in till centrum eller
              vidare österut. För dig som hellre väljer cykel och inte är rädd
              för backar är cykelbanorna väl utbyggda. Härliga naturreservatet
              Delsjön ligger alldeles runt knuten med möjlighet till en mängd
              naturupplevelser i form av bad, kanotpaddling, friluftsliv eller
              ridning. <br />
              <br />
              Denna mysiga lägenhet har öppen planlösning mellan kök och
              vardagsrumrum som ger sociala ytor med plats för umgänge. Väggarna
              är målade väggar i ljus kulör, och golvet är genomgående
              parkettgolv. I hallen är det grå klinker vid entrédörren. Till
              lägenheten hör en uteplats som vetter in mot den gemensamma
              innergården. Det helkaklade badrummet är utrustat med tvättmaskin,
              torktumlare, handdukstork och dusch med duschväggar i glas. Köket
              har vita skåpluckor, glashällsspis med varmluftsugn och
              diskmaskin.
              <br />
              <br />
              Lägenheten ligger i en modern och energieffektiv fastighet och
              varje lägenhet har individuell mätning för el- och
              vattenförbrukning, därmed betalar du endast för det du själv
              förbrukar och har större möjlighet att påverka kostnaderna.
              Kostnaden debiteras separat på din hyresavi. <br />
              <br />
              Garageplats finns att hyra separat i mån av ledig plats.
              <br />
              <br />
              Information kring lägenheten finner du/ni i annonsen, vi har
              dessvärre inte möjlighet att besvara på ytterligare frågor om
              lägenheten innan du som sökande får ett ev. erbjudande om visning.
              <br />
              <br />
              Välkommen med din ansökan!{" "}
            </p>
          </div>

          {/* QUICKINFO BOX */}

          <div className="quickinfo flex flex-col flex-end w-4/12 max-w-[300px]">
            <img src="/studystay-logo.png" alt="Logo-img" />
            <div className="flex flex-col bg-blue-gray-200 p-6">
              <h1 className="font-bold">Översikt</h1>
              <p>Område:</p>
              <p className="flex justify-between">
                Våning: <span>{item.floor}</span>
              </p>
              <p className="flex justify-between">
                Inflytt: <span>{formattedDate}</span>
              </p>
              <p className="flex justify-between">
                Ansök senast: <span>{formattedMoveInDate}</span>
              </p>
              <p className="flex flex-row justify-between">
                Hyresvärd:
                <span className="flex flex-row">
                  <AiFillStar className="fill-orange-800" />
                  <AiFillStar className="fill-orange-800" />
                  <AiFillStar className="fill-orange-800" />
                  <AiFillStar className="fill-orange-800" />
                  <AiFillStar className="fill-orange-800" />
                </span>
              </p>
              <p className="py-4">
                Ansökan är öppen och görs via vår bostadskö.
              </p>
              <button className="w-48 mx-auto uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl">
                Till ansökan
              </button>
            </div>

            <div className="amentities flex flex-wrap justify-center w-full px-1 py-4">
              {item.amenities.includes("Wifi") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Wifi"]}
                  <span>Wifi</span>
                </div>
              )}
              {item.amenities.includes("Kök") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Kök"]}
                  <span>Kök</span>
                </div>
              )}
              {item.amenities.includes("Tvättmaskin") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Tvättmaskin"]}
                  <span>Tvättmaskin</span>
                </div>
              )}
              {item.amenities.includes("Tv") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Tv"]}
                  <span>TV</span>
                </div>
              )}
              {item.amenities.includes("Dedikerad arbetsyta") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Arbetsyta"]}
                  <span>Arbetsyta</span>
                </div>
              )}
              {item.amenities.includes("Parkering") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Parkering"]}
                  <span>Parkering</span>
                </div>
              )}
              {item.amenities.includes("Balkong") && (
                <div className="flex flex-col items-center justify-center w-1/3 mb-4">
                  {amenityIcons["Balkong"]}
                  <span>Balkong</span>
                </div>
              )}
              {item.amenities.includes("Hiss") && (
                <div className="flex flex-col items-center justify-center w-1/4 p-2 mb-4">
                  {amenityIcons["Hiss"]}
                  <span>Hiss</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingDetails;
