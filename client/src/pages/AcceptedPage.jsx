import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AcceptedPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const acceptedObject = user?.applications?.find((obj) => obj._id === id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckboxChange = () => {
    setAcceptTerms(!acceptTerms);
  };

  const handleAcceptButton = () => {
    if (acceptTerms) {
      navigate(`/payment/${acceptedObject._id}`);
    } else {
      toast.error("Acceptera villkoren");
    }
  };
  const handleDeleteApplication = async (user, acceptedObject) => {
    try {
      const userId = user._id;
      const applicationId = acceptedObject._id;

      await axios.delete(`/users/${userId}/applications/${applicationId}`);

      const updatedUser = {
        ...user,
        applications: user.applications.filter(
          (app) => app._id !== applicationId
        ),
      };
      setUser(updatedUser);
      navigate("/myapplications");
      toast.success("Ansökan borttagen");
    } catch (error) {
      toast.error("An error occurred while deleting the application.");
    }
  };

  return (
    <>
      <div>
        <div className="w-10/12 mx-auto lg:w-8/12">
          <div className="my-6">
            <h1 className="text-2xl text-center">
              Grattis {user?.name}! Din ansökan för bostaden har blivit godkänd!
            </h1>
            <p className="py-4">
              Kontrollera informationen nedan noggrant innan du tackar ja till
              bostaden. Det är viktigt att all information stämmer och att du
              känner till alla villkor och krav innan du fortsätter
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 md:flex">
        <div className=" md:mx-6 md:w-[20em] px-2 mb-6">
          <div className="flex justify-center items-center h-[20em] ">
            <img
              src={acceptedObject?.images[0].data}
              alt="image"
              className="rounded-t-2xl h-full md:h-[20em] w-full object-cover"
            ></img>
          </div>
          <div className="översikt px-4 pt-4 pb-4 flex-col space-y-2 bg-gray-200 rounded-b-xl ">
            <p className="flex justify-between font-bold">
              {acceptedObject.street} {acceptedObject.streetNumber}{" "}
              <span className="font-normal">{acceptedObject.area}</span>
            </p>
            <p className="flex justify-between">
              {acceptedObject.price} kr/mån <span>Brf</span>
            </p>
            <p className="flex justify-between">
              {acceptedObject.rooms} kr/mån{" "}
              <span>{acceptedObject.size} kvm</span>
            </p>
          </div>
        </div>
        <div className="md:w-2/3 mx-5">
          <h4 className="font-bold">
            Viktiga krav och villkor från hyresföreningen:
          </h4>
          <p className="py-2">
            <span className="font-bold">1. Deposition:</span> En deposition om 5
            000 kr måste betalas inom 7 dagar från accepterade datumet. Denna
            summa återbetalas när du flttar ut, förutsatt att bostaden lämnas i
            ursprungligt skick
          </p>
          <p className="py-2">
            <span className="font-bold">2. Husdjur:</span> Husdjur är tillåtna,
            men en särskild avgift om 200 kr/månad tillkommer
          </p>
          <p className="py-2">
            <span className="font-bold">3. Rökning:</span> Rökning är strikt
            förbjuden inom bostadens område, inklusive balkonger och gemensamma
            utrymmen
          </p>
          <p className="py-2">
            <span className="font-bold">4. Inflyttningsdatum:</span>{" "}
            Inflyttningsdatum är den 1:a varje månadad. Var god se till att
            koordinera med fastighetsskötaren för att undvika kollisione
          </p>
          <p className="py-2">
            <span className="font-bold"> 5. Uppsägningstid:</span>{" "}
            Uppsägningstiden är tre månader från och med den första i nästa
            månad efter att uppsägning har gjorts
          </p>
          <div className="md:ml-auto">
            <div className="flex terms-checkbox py-4 justify-center md:justify-end">
              <label>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Jag godkänner hyresvärdens villkor
              </label>
            </div>
            <div className="buttons flex justify-center items-center space-x-6 md:justify-end">
              <button
                onClick={() => handleDeleteApplication(user, acceptedObject)}
                className="mt-2 bg-primary text-white py-0.5 px-4 w-32 rounded-2xl shadow-md shadow-gray-500"
              >
                TACKA NEJ
              </button>
              <button
                onClick={handleAcceptButton}
                className="mt-2 bg-primary text-white py-0.5 px-4 w-32 rounded-2xl shadow-md shadow-gray-500"
              >
                TACKA JA
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptedPage;
