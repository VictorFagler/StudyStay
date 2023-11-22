import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("./login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data);
        setData({});
        navigate("/profile");
        toast.success("Login success!");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="w-full h-[16em] md:h-[26em]">
        <img
          src="loginpage.png"
          alt="loginpage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="content-container w-10/12 mx-auto text-center flex flex-col md:items-center py-6">
        <h1>Mina sidor</h1>
        <p className="text-left">
          Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du
          står i vår bostadskö.
        </p>
        <img src="studystay-logo.png" alt="studystay" className="py-6" />
        <p className="text-lg font-semibold uppercase">
          Vänligen fyll i fälten nedan
        </p>

        <form
          id="loginform"
          onSubmit={loginUser}
          className="flex flex-col items-center"
        >
          <input
            className="bg-gray-200 h-[2em] w-[20em] rounded-lg p-3 placeholder-black opacity-50"
            type="email"
            placeholder="E-MAIL"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <input
            className="bg-gray-200 h-[2em] w-[20em] rounded-lg p-3 placeholder-black mt-6 opacity-50"
            type="password"
            placeholder="LÖSENORD"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button
            type="submit"
            className="mt-6 w-48 uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl drop-shadow-xl"
          >
            Logga in
          </button>
        </form>
        <p className="pt-6">Vill du registerea ett konto?</p>
        <p>
          <Link to="/register">
            <span className="font-bold">Klicka här</span>
          </Link>{" "}
          för att registera dig.
        </p>
      </div>
    </>
  );
};

export default MyProfile;
