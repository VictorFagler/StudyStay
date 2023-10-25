import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const newListing = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [rooms, setRooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [floor, setFloor] = useState("");
  const [unitType, setUnitType] = useState("Lägenhet");
  const [amenities, setAmenities] = useState([]);
  const [street, setStreet] = useState("");
  const [streetNumber, setstreetNumber] = useState("");
  const [city, setcity] = useState("");
  const [area, setArea] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [selectedImages, setselectedImages] = useState([]);
  const [price, setPrice] = useState(""); // Add price state
  const [size, setSize] = useState(""); // Add price state
  const [description, setDescription] = useState(""); // Add description state

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();
      reader.onload = (event) => {
        // Read the image data URL
        const imageBase64 = event.target.result;

        // Resize the image before setting it in state
        const maxWidth = 800;
        const maxHeight = 600;

        const img = new Image();
        img.onload = function () {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;

            if (width > maxWidth) {
              width = maxWidth;
              height = width / aspectRatio;
            }

            if (height > maxHeight) {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            // Convert the resized image to base64
            const resizedBase64Image = canvas.toDataURL("image/jpeg");
            imagesArray.push(resizedBase64Image);

            // If all images are processed, update the state
            if (imagesArray.length === files.length) {
              setselectedImages(imagesArray);
            }
          }, "image/jpeg");
        };
        img.src = imageBase64;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!unitType) {
      missingFields.push("unitType");
    }
    if (!street) {
      missingFields.push("Gata");
    }
    // if (!streetNumber) {
    //   missingFields.push("Gatunummer");
    // }
    // if (!city) {
    //   missingFields.push("Stad");
    // }
    // if (!zipcode) {
    //   missingFields.push("Postnummer");
    // }
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.join(", ");
      toast.error(`Fält saknas: ${missingFieldNames}`);
      return;
    }

    if (isFormSubmitted)
      try {
        const { data } = await axios.post(
          "/listings",
          {
            unitType,
            street,
            streetNumber,
            city,
            area,
            zipcode,
            price,
            rooms,
            floor,
            date,
            size,
            amenities,
            description,
            image: selectedImages,
          },
          { withCredentials: true }
        );
        if (data.error) {
          toast.error(data.error);
        } else {
          clearFilters();
          toast.success("Listing created");
        }
      } catch (error) {
        console.log(error);
      }
  };

  const handleAmenitiesChange = (e) => {
    const amenity = e.target.value;
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  const handleListBoendeClick = () => {
    // Set the form submission flag to true when "Lista boende" is clicked
    setIsFormSubmitted(true);
  };

  const clearFilters = (e) => {
    setUnitType("Lägenhet");
    setStreet("");
    setstreetNumber("");
    setcity("");
    setArea("");
    setzipcode("");
    setPrice("");
    setRooms("");
    setNumBathrooms("");
    setFloor("");
    setDate("");
    setSize("");
    setAmenities([]);
    setDescription("");
    setselectedImages([]);
  };

  /////////////////////////////// RETURN /////////////////////////////

  return (
    <React.Fragment>
      <div className="w-full h-[26em]">
        <img
          src="loginpage.png"
          alt="loginpage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white rounded-3xl md:max-w-2xl mx-auto">
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
            <div className="unitType-options flex flex-col md:flex-row justify-center md:px-10">
              <button
                className={`unitType-button ${
                  unitType === "Lägenhet" ? "selected" : ""
                } p-2 border w-full rounded-t-xl  border-gray-400 md:border-l-xl
                      md:rounded-l-xl md:rounded-r-none`}
                onClick={() => setUnitType("Lägenhet")}
              >
                Lägenhet
              </button>
              <button
                className={`unitType-button ${
                  unitType === "Hus" ? "selected" : ""
                } p-2 border w-full px-4 border-gray-400`}
                onClick={() => setUnitType("Hus")}
              >
                Hus
              </button>
              <button
                className={`unitType-button ${
                  unitType === "Korridor" ? "selected" : ""
                } p-2 border w-full px-4 border-gray-400 `}
                onClick={() => setUnitType("Korridor")}
              >
                Korridor
              </button>
              <button
                className={`unitType-button ${
                  unitType === "Rum" ? "selected" : ""
                } p-2 border w-full rounded-b-xl border-gray-400 
                      md:rounded-r-xl md:rounded-l-none`}
                onClick={() => setUnitType("Rum")}
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
                value={street}
                placeholder="Strandvägen"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />

              <p className="text-sm">Nummer</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="text"
                id="streetNumber"
                name="streetNumber"
                value={streetNumber}
                placeholder="19B"
                onChange={(e) => setstreetNumber(e.target.value)}
              />

              <p className="text-sm">Stad</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="city"
                name="city"
                value={city}
                placeholder="Stockholm"
                onChange={(e) => setcity(e.target.value)}
              />
              <p className="text-sm">Ort</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="string"
                id="area"
                name="area"
                value={area}
                placeholder="Nacka"
                onChange={(e) => setArea(e.target.value)}
              />

              <p className="text-sm">Postnummer</p>
              <input
                className="border-2 rounded px-2 py-1 w-full"
                type="number"
                id="zipcode"
                name="zipcode"
                value={zipcode}
                placeholder="132 31"
                onChange={(e) => setzipcode(e.target.value)}
              />
            </div>
          </div>
          <div className="w-64 minmax flex flex-col px-4 py-4 border-b-2 border-gray-300">
            <div>
              <h4 className="font-bold text-lg ">Pris</h4>
            </div>
            <p className="text-sm">Månadshyra</p>
            <div className="flex flex-col  my-2">
              <input
                className="border-2 rounded px-2 py-1"
                type="number"
                id="price"
                name="price"
                value={price}
                placeholder="Kr 3000"
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="text-sm">Kvadratmeter</p>

              <input
                className="border-2 rounded px-2 py-1"
                type="number"
                id="size"
                name="size"
                value={size}
                placeholder="34"
                onChange={(e) => setSize(e.target.value)}
              />
              <p className="text-sm">Uthyrningsperiod</p>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                showDayMonthYearPicker
                placeholderText="DD / MM / YYYY"
                id="rentalPeriod"
                name="rentalPeriod"
                className="border-2 rounded px-2 py-1 w-56"
              />
            </div>
          </div>
          <div className="minmax flex flex-col px-4 py-4 border-b-2 border-gray-300">
            <div>
              <h4 className="font-bold text-lg ">Beskrvining</h4>
            </div>
            <textarea
              className="border-2 rounded px-2 py-1"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
                      rooms === index + 1 ? "selected" : ""
                    } px-5 py-1 mr-1 mb-1 rounded-xl border border-gray-300 min-w-[60px] h-[35px] w-[68px]`}
                    onClick={() => setRooms(index + 1)}
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
                      floor === index + 1 ? "selected" : ""
                    } px-5 py-1 mr-1 mb-1 rounded-xl border border-gray-300 min-w-[60px] h-[35px] w-[68px]`}
                    onClick={() => setFloor(index + 1)}
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
                    value="Tvättmaskin"
                    checked={amenities.includes("Tvättmaskin")}
                    onChange={handleAmenitiesChange}
                  />
                  Tvättmaskin
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    value="TV"
                    checked={amenities.includes("TV")}
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
            <h4 className="font-bold text-lg mx-4 my-2">Ladda upp bilder</h4>
            <input
              className="mx-4"
              type="file"
              multiple
              accept="image/jpeg, image/png, image/jpg, image/avif"
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap justify-center mx-auto ">
              {selectedImages.map((image, index) => (
                <img
                  className="w-32 h-32 border rounded-xl m-1"
                  key={index}
                  src={image}
                  alt={`Selected ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 mt-6">
            <button
              className="underline font-bold"
              onClick={() => clearFilters()}
            >
              Rensa alla
            </button>
            <button
              onClick={() => handleListBoendeClick()}
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
export default newListing;
