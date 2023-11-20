import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useParams } from "react-router-dom";

const AcceptedPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();

  const acceptedObject = user.applications.find((obj) => obj._id === id);
  console.log("User:", user);
  console.log("acceptedobject:", acceptedObject);
  return (
    <>
      <div>
        <h1>Grattis {user.name}!</h1>
      </div>
      <div>ID: {id}</div>
      <img src={acceptedObject.images[0].data} alt="image"></img>
      <p>
        {acceptedObject.street} {acceptedObject.streetNumber},{" "}
        {acceptedObject.zipcode}
        {acceptedObject.price}
      </p>
      <p>{acceptedObject.area}</p>
      <div></div>

      <div>
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
          Uppsägningstiden är tre månader från och med den första i nästa månad
          efter att uppsägning har gjorts
        </p>
        <button className=" bg-white rounded-2xl border-black border-2 py-1 px-4">
          TACKA NEJ
        </button>
        <Link to={`/payment/${acceptedObject._id}`}>
          <button className="text-white bg-primary rounded-xl 2 py-1 px-4">
            TILL BETALNING
          </button>
        </Link>
      </div>
    </>
  );
};

export default AcceptedPage;
