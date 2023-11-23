import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const acceptedObject = user.applications.find((obj) => obj._id === id);
  const deposition = 1000;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col mx-auto md:w-8/12">
          <h1 className="text-center">Betalning</h1>
          <p className="py-4">
            Registrera ditt kort för att slutföra godkännandet av bostaden.
            Depositionen kommer att dras omgående och återbetalas när du flyttar
            ut. Hyran kommer att dras från ditt konto den sista dagen varje
            månad
          </p>
        </div>

        <div className=" rounded-2xl py-4 max-w-[28em] mx-auto">
          <div className="">
            <img
              src="/studystay-logo.png"
              alt="Logo-img"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-gray-200 p-4 py-8 space-y-1 rounded-xl">
            <h4 className="font-bold pb-6">Att betala</h4>
            <p className="flex justify-between">
              <span>Hyra:</span>
              <span>{acceptedObject.price} kr</span>
            </p>
            <p className="flex justify-between">
              <span>Deposition:</span>
              <span>{deposition} kr</span>
            </p>
            <p className="flex justify-between font-bold">
              <span>Totalt:</span>
              <span>{acceptedObject.price + deposition} kr</span>
            </p>
          </div>
        </div>

        <div>
          <div className="container mx-auto mt-8 p-2 max-w-[28em]">
            <h4 className="ml-2 font-bold pb-4">Betalning</h4>
            <form className="bg-white rounded px-2 pb-8 mb-4">
              <div className="mb-4">
                <input
                  className="shadow border rounded w-full py-2 px-3 "
                  id="cardName"
                  name="cardName"
                  type="text"
                  placeholder="Kortinnehavare"
                  // required
                />
              </div>

              <div className="mb-4">
                <input
                  className="shadow border rounded w-full py-2 px-3"
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="Kortnummer"
                  // required
                />
              </div>

              <div className="flex mb-4">
                <div className="mr-2 w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 opacity-75"
                    htmlFor="expDate"
                  >
                    Utgångsdatum
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="expirationDate"
                    name="expirationDate"
                    type="text"
                    placeholder="MM/YY"
                    // required
                  />
                </div>

                <div className="ml-2 w-1/2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 opacity-75"
                    htmlFor="cvcCode"
                  >
                    Säkerhetskod
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="cvcCode"
                    name="cvcCode"
                    type="text"
                    placeholder="CVV"
                    // required
                  />
                </div>
              </div>
              <button
                className="flex w-48 mx-auto uppercase justify-center bg-orange-800 text-white py-2 px-6 rounded-3xl shadow-xl mt-6"
                type="submit"
              >
                BETALA
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
