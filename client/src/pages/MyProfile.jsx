import { React, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="w-full h-[26em]">
        <img
          src="loginpage.png"
          alt="loginpage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="content-container w-10/12 mx-auto text-center flex flex-col items-center py-6">
        <h1>Mina sidor</h1>
        <p>
          Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du
          står i vår bostadskö.
        </p>
        <img src="studystay-logo.png" alt="studystay" className="py-6" />
        <p className="text-lg font-semibold">Vänligen fyll i fälten nedan</p>
        <form action="submit" className="py-6">
          <input
            type="username"
            placeholder="Användarnamn"
            className="bg-gray-200 h-[2em] w-[16em] rounded-lg p-2 placeholder-black mr-6"
          />
          <input
            type="password"
            placeholder="********"
            className="bg-gray-200 h-[2em] w-[16em] rounded-lg p-2 placeholder-black"
          />
        </form>
        <button className="mt-6 w-48 mx-auto uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl">
          Logga in
        </button>
        <p className="pt-6">Vill du registerea ett konto?</p>
        <p>
          <Link to="/register">
            <span className="font-bold">Klicka här</span>
          </Link>{" "}
          för att registera dig.
        </p>
      </div>
      {/* <div>{!!user && <h2>Välkommen {user.name} !</h2>}</div> */}
    </>
  );
};

export default MyProfile;
