import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiWifi, BiSolidParking, BiMap } from "react-icons/Bi";
import {
  PiCookingPot,
  PiTelevisionSimpleBold,
  PiElevatorDuotone,
} from "react-icons/Pi";
import { GiWashingMachine } from "react-icons/Gi";
import {
  BsPersonWorkspace,
  BsBuildings,
  BsStar,
  BsStarFill,
  BsStarHalf,
} from "react-icons/Bs";
import { MdBalcony } from "react-icons/Md";
import { GrMoney } from "react-icons/Gr";
import { IoTodayOutline, IoBedOutline } from "react-icons/Io5";
import { LuBox } from "react-icons/Lu";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ListingDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState([0]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          setItem(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setItem(null);
      });
  }, [id]);

  if (item === null) {
    return (
      <div className="mt-20 flex justify-center">
        <AiOutlineLoading3Quarters />
      </div>
    );
  }

  const dateFromDatabase = new Date(item?.date);
  const formattedDate = dateFromDatabase?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const moveInDate = new Date(item?.date);
  moveInDate?.setMonth(moveInDate?.getMonth() - 3);
  const formattedMoveInDate = moveInDate?.toLocaleDateString("en-US", {
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

  const nextImage = () => {
    setCurrentIndex(
      (prevIndex) => [prevIndex + 1] % item.images[0].data.length
    );
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + item.images[0].data.length) %
        item.images[0].data.length
    );
  };

  const firstImageData = item.images.length > 0 ? item.images[0].data[0] : null;

  const currentImageData =
    item.images.length > 0 ? item.images[0].data[currentIndex] : null;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextImage();
    } else if (touchEnd - touchStart > 100) {
      // Swipe right
      prevImage();
    }
  };

  return (
    <>
      <div className="container md:w-10/12 w-100 justify-center items-center mx-auto mt-6">
        {/* IMAGE SLIDESHOW ON SMALL DEVICE */}
        <div
          className="md:hidden w-full items-center justify-center max-h-80"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {firstImageData && (
            <div className="p-1 relative w-100 object">
              <button
                onClick={prevImage}
                className="text-white z-50 absolute left-0 h-full bg-white bg-opacity-10 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ArrowBigLeft />
              </button>
              <div className="w-[100%] h-80 overflow-hidden">
                <img
                  className="rounded-xl w-full h-80 object-cover"
                  src={currentImageData}
                  alt="img"
                />
              </div>
              <button
                onClick={nextImage}
                className="text-white z-50 absolute top-1/2 transform -translate-y-1/2 right-0 h-full bg-white bg-opacity-20 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ArrowBigRight />
              </button>
              <div className="absolute flex items-center justify-center bottom-3 w-full">
                {item.images[0].data.map((_, buttonIndex) => (
                  <button
                    key={buttonIndex}
                    onClick={() => {
                      const updatedIndexes = [...currentIndex];
                      updatedIndexes[currentIndex] = buttonIndex;
                      setCurrentIndex(updatedIndexes);
                    }}
                    className={`bg-gray-200 opacity-50 rounded-2xl w-2 h-2 mx-0.5 ${
                      currentIndex === buttonIndex
                        ? "bg-white-500 scale-150 opacity-[100%] outline-black"
                        : ""
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* IMAGES ON SMALL MD+ DEVICE */}
        <div className="hidden md:firstFourImages md:flex md:h-[600px] mx-auto items-center">
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
        <div className="housingDetails flex md:w-12/12 lg:w-10/12 mx-auto my-6 justify-center">
          <div className="hidden border-r-2 w-1/6 md:flex flex-col items-center">
            <BiMap size={32} />
            {item.street} {item.streetNumber}
          </div>
          <div className="border-r-2 w-1/3 md:w-1/6 flex flex-col items-center">
            <GrMoney size={32} />
            <div>{item.price} kr/mån</div>
          </div>
          <div className="border-r-2 w-1/3 md:w-1/6 flex flex-col items-center">
            <IoBedOutline size={32} />
            <div>{item.rooms} rum</div>
          </div>
          <div className="border-r-2 w-1/3 md:w-1/6 flex flex-col items-center">
            <LuBox size={32} />
            <div>{item.size} m²</div>
          </div>
          <div className="hidden border-r-2 w-1/6 md:flex flex-col items-center">
            <IoTodayOutline size={32} />
            <div>{formattedDate}</div>
          </div>
          <div className="hidden w-1/6 md:flex flex-col items-center">
            <BsBuildings size={32} />
            <div>{item.unitType}</div>
          </div>
        </div>
        {restOfImages.length > 0 ? (
          // Render additional images if > 4 total
          <div className="AdditionImages hidden lg:flex lg:h-[24em]">
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
        ) : null}
        <div className=" mx-auto mt-8 flex flex-wrap md:flex-nowrap justify-center">
          <div className="w-full md:flex-start p-3 lg:pr-16 md:mr-10">
            <h1 className="text-4xl">
              {item.street} {item.streetNumber}
            </h1>
            <h2 className="mt-2 italic text-gray-600">
              {item.price}kr/mån | {item.rooms} RoK | {item.size}m²
            </h2>
            <p className="my-8">
              Välkommen till {item.street} i {item.area}! Här finns nu en ljus
              och välplanerad lägenhet i fastighet som stod klar för inflyttning
              i lutet av 2018. I nära anslutning till porten finns allmänna
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
              Välkommen med din ansökan!
            </p>
          </div>

          {/* QUICKINFO BOX */}

          <div className="quickinfo p-2 flex w-full flex-wrap-reverse md:flex-wrap md:flex-col md:flex-end md:w-6/12">
            <div className="hidden md:flex">
              <img src="/studystay-logo.png" alt="Logo-img" />
            </div>
            <div className="flex flex-col w-full bg-blue-gray-200 p-6 rounded-xl">
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
                <span className="flex flex-row">
                  <BsStarFill className=" fill-primary" />
                  <BsStarFill className=" fill-primary" />
                  <BsStarFill className=" fill-primary" />
                  <BsStarFill className=" fill-primary" />
                  <BsStarHalf className=" fill-primary" />
                </span>
              </p>
              <p className="py-4">
                Ansökan är öppen och görs via vår bostadskö.
              </p>
              <Link
                to={`/application/${item._id}`}
                state={{ item, formattedMoveInDate }}
              >
                <div className="flex justif-center">
                  <button className="w-48 mx-auto uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl">
                    Till ansökan
                  </button>
                </div>
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
                <div className="flex flex-col items-center justify-center w-1/3 p-2 mb-4">
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
