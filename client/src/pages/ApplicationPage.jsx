import React from "react";
import { useLocation } from "react-router-dom";

const ApplicationPage = () => {
  const location = useLocation();
  const { item, formattedMoveInDate } = location.state;

  return (
    <>
      <div className="pagecontainer w-10/12 mx-auto mb-36 mt-10">
        <div>
          <h1>
            Ansök till {item.street} {item.streetNumber}
          </h1>
        </div>

        {/* Parent container for leftside and rightside */}
        <div className="flex flex-wrap">
          <div className="w-1/2 p-4 pr-6">
            <div className="mb-8 max-w-2xl">
              <img
                src={`${item.images[0].data[0]}`}
                alt={item.title}
                className="h-[38em] object-cover rounded-xl"
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
          <div className="w-1/2 p-4 pl-10 ">
            <h4 className="font-bold">
              Viktiga krav och villkor från hyresföreningen
            </h4>{" "}
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
              <p className="text-right">Jag godkänner hyresvärdens villkor</p>
              <br />
              <button className="ml-auto w-48 uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl">
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