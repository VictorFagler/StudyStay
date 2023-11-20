import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const acceptedObject = user.applications.find((obj) => obj._id === id);
  const deposition = 1000;
 
  return (
    <>
      <div>
        <h1>Betalning</h1>
        <p>
          Registrera ditt kort för att slutföra godkännandet av bostaden.
          Depositionen kommer att dras omgående och återbetalas när du flyttar
          ut. Hyran kommer att dras från ditt konto den sista dagen varje månad
        </p>

        <div className="bg-gray-200">
          <h4>Att betala</h4>
          <p>Hyra: {acceptedObject.price} kr</p>
          <p>Deposition: {deposition} kr</p>
          <p>Totalt: {acceptedObject.price + deposition} kr</p>
        </div>

        <div>
          <h4>Betalning</h4>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
