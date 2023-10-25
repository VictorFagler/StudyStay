import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiWifi, BiSolidParking, BiMap } from "react-icons/Bi";
import {
  PiCookingPot,
  PiTelevisionSimpleBold,
  PiElevatorDuotone,
} from "react-icons/Pi";
import { GiWashingMachine } from "react-icons/Gi";
import { BsPersonWorkspace, BsBuildings } from "react-icons/Bs";
import { MdBalcony } from "react-icons/Md";
import { GrMoney } from "react-icons/Gr";
import { IoTodayOutline, IoBedOutline } from "react-icons/Io5";
import { LuBox } from "react-icons/Lu";

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
      <div className="container w-11/12 mx-auto mt-6">
        <div className="firstFourImages flex h-[600px] mx-auto items-center">
          <div className="flex flex-row w-2/3 h-full">
            {firstFourImages.slice(0, 2).map((imageData, index) => (
              <div key={index} className="w-full h-full">
                <img
                  className="p-1 rounded-2xl object-cover h-full w-full"
                  src={`data:${item.images[0].contentType};${imageData}`}
                  alt={`Image`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/3 h-full">
            {firstFourImages.slice(2, 4).map((imageData, index) => (
              <div key={index} className="p-1 h-1/2">
                <img
                  className="rounded-xl object-cover h-full w-full"
                  src={`data:${item.images[0].contentType};${imageData}`}
                  alt={`img`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="housingDetails flex w-8/12 mx-auto my-6 justify-center">
          <div className="border-r-2 w-1/6 flex flex-col items-center">
            <BiMap size={32} />
            {item.street} {item.streetNumber}
          </div>
          <div className="border-r-2 w-1/6 flex flex-col items-center">
            <GrMoney size={32} />
            <div>{item.price} kr/mån</div>
          </div>
          <div className="border-r-2 w-1/6 flex flex-col items-center">
            <IoBedOutline size={32} />
            <div>{item.rooms} rum</div>
          </div>
          <div className="border-r-2 w-1/6 flex flex-col items-center">
            <LuBox size={32} />
            <div>{item.size} m²</div>
          </div>
          <div className="border-r-2 w-1/6 flex flex-col items-center">
            <IoTodayOutline size={32} />
            <div>{formattedDate}</div>
          </div>
          <div className="w-1/6 flex flex-col items-center">
            <BsBuildings size={32} />
            <div>{item.unitType}</div>
          </div>
        </div>

        <div className="AdditionImages flex h-[24em]">
          {restOfImages.map((imageData, index) => (
            <div key={index} className="flex h-full w-1/4 py-2 px-3">
              <img
                className="rounded-xl object-cover w-full h-full"
                src={`data:${item.images[0].contentType};${imageData}`}
                alt="img"
              />
            </div>
          ))}
        </div>

        <div className=" mx-auto mt-8 flex justify-center">
          <div className="w-full flex-start pr-16 mr-28">
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

          <div className="quickinfo flex flex-col flex-end w-5/12">
            <img src="/studystay-logo.png" alt="Logo-img" />
            <div className="flex flex-col bg-blue-gray-200 p-6">
              <h2 className="font-bold">Översikt</h2>
              <p className="flex justify-between">
                Område: <span>{item.area}</span>
              </p>
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
                <span className="flex flex-row">Brf</span>
              </p>
              <p className="flex flex-row justify-between">
                Betyg:
                <span className="flex flex-row">-INSERT STARS-</span>
              </p>
              <p className="py-4">
                Ansökan är öppen och görs via vår bostadskö.
              </p>
              <Link
                to={`/application/${item._id}`}
                state={{ item, formattedMoveInDate }}
              >
                <button className="w-48 mx-auto uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl">
                  Till ansökan
                </button>
              </Link>
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
