import { React, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { toast } from "react-hot-toast";

const ApplicationPage = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const { item, formattedMoveInDate } = location.state;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleApplication = async () => {
    try {
      if (!isChecked) {
        // Om checkboxen inte är markerad, ge användaren ett meddelande
        toast.error("Du måste godkänna villkoren för att ansöka.");
        return;
      }
      const userId = user.id || user._id;
      const appImage = item.images[0].data[0];

      const newApplication = {
        unitType: item.unitType,
        street: item.street,
        streetNumber: item.streetNumber,
        zipcode: item.zipcode,
        area: item.area,
        isOpen: false,
        price: item.price,
        image: {
          data: appImage,
          contentType: "image/jpeg",
        },
      };

      // Send a POST request to the server
      const response = await axios.post(`/users/${userId}/applications`, {
        applications: newApplication,
      });

      // Log the actual response from the server
      console.log("Server response:", response.data);
      toast.success("Ansökan skapad");

      // Assuming the server responds with the created application
      const createdApplication = response.data.newApplication;
      user.applications.push(createdApplication);

      if (!userId) {
        console.error("User ID not found");
        toast.error("No user ID found");
        return;
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Du måste vara inloggad");
    }
  };

  return (
    <>
      <div className="pagecontainer md:w-10/12 max-w-[1400px] mx-auto mb-36 mt-10">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl justify-center text-center">
            Ansök till {item.street} {item.streetNumber}
          </h1>
        </div>

        {/* Parent container for leftside and rightside */}
        <div className="flex flex-wrap justify-center">
          <div className="lg:w-1/2 p-4 pr-6">
            <div className="mb-8 max-w-2xl ">
              <img
                src={`${item.images[0].data[0]}`}
                alt={item.title}
                className="md:h-[38em] object-cover rounded-xl"
              />
            </div>
            <div className="översikt max-w-2xl bg-gray-300 px-8 py-12 rounded-xl flex-col space-y-1 ">
              <h2 className="font-bold text-lg mb-6 mt-[-15px]">Översikt</h2>
              <p className="flex justify-between">
                Hyra: <span>{item.price} kr/mån</span>
              </p>
              <p className="flex justify-between">
                Område <span>{item.area}</span>
              </p>
              <p className="flex justify-between">
                Våning:<span>{item.floor}</span>
              </p>
              <p className="flex justify-between">
                Inflytt <span>{formattedMoveInDate}</span>
              </p>
              <p className="flex justify-between">
                Ansök senast<span>Ansök senast</span>
              </p>
              <p className="flex justify-between">
                Hyresvärd<span>Brf</span>
              </p>
              <p className="flex justify-between">
                Betyg<span>STARS</span>
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 p-4 md:pl-10 ">
            <h4 className="font-bold">
              Viktiga krav och villkor från hyresföreningen
            </h4>
            <br />
            <p>
              <span className="font-bold">1. Deposition:</span> En deposition om
              5 qqq kr måste betalas inom 7 dagar från acceptdatumet Denna summa
              återbetalas när du flyttar ut, förutsatt att bostaden lämnas i
              ursprungligt skick. <br />
              <br />
              <span className="font-bold">2. Husdjur:</span> Husdjur är
              tillåtna, men en särskild avgift om 500 kr/ månad tillkommer.
              <br />
              <br />
              <span className="font-bold">3. Rökning:</span> Rökning är strikt
              förbjuden inom bostadens område, inklusive balkonger och
              gemensamma utrymmen. <br />
              <br />
              <span className="font-bold">4. Inflyttningsdatum:</span> Om
              inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet
              första vardagen på kommande vecka Var god se till att koordinera
              med fastighetsskötaren för att undvika kollisioner. <br />
              <br />
              <span className="font-bold">5. Uppsägningstid:</span>
              Uppsägningstiden är tre månader från och med den första i nästa
              månad efter att uppsägning har gjorts. <br />
              <br />
              Vänligen läs igenom alla villkor noga Om du har några frågor eller
              funderingar, kontakta hyresföreningen innan du tackar ja
            </p>
            <br />
            <div className="flex flex-col">
              <label className="flex items-center mx-auto md:ml-auto md:mr-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Jag godkänner hyresvärdens villkor
              </label>
              <br />
              <button
                onClick={handleApplication}
                className="mx-auto md:ml-auto md:mr-0 w-48 uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl"
              >
                Ansök
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
