import React from "react";

const MyApplication = () => {
  return (
    <>
      <div className="container w-10/12 mx-auto mt-6">
        <div className="text-box w-10/12 mx-auto">
          <h1 className="text-center my-8">Mina ansökningar</h1>
          <p className="text-left">
            Välkommen till översikten av dina lägenhetsansökningar. Här kan du
            enkelt hålla koll på alla de bostäder du har visat intresse för. För
            varje ansökan kan du se aktuell status, vilket ger dig en tydlig
            uppfattning om var i processen din ansökan befinner sig. Vi
            uppdaterar informationen löpande så att du alltid har den senaste
            informationen till hands.
          </p>
        </div>
        <div className="applicatiionslist flex flex-col items-center p-10">
          <div className="bg-gray-500 w-8/12 h-48 my-6">List1</div>
          <div className="bg-gray-500 w-8/12 h-48 my-6">List2</div>
          <div className="bg-gray-500 w-8/12 h-48 my-6">List3</div>
        </div>
      </div>
    </>
  );
};

export default MyApplication;
