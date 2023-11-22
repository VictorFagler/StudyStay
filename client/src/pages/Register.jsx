import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, confirmPassword } = data;
    try {
      if (password !== confirmPassword) {
        toast.error("Lösenordet matchar inte");
        return;
      }
      const { data } = await axios.post(
        "/register",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success("Register Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-[18em] md:h-[26em]">
        <img
          src="registerimage.jpg"
          alt="registerimage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="content-container w-10/12 mx-auto flex flex-col items-center py-6">
        <h1 className="text-3xl md:text-4xl mb-4">Gå med i vår bostadskö</h1>
        <p className="md:w-10/12">
          Välkommen till StudyStays bostadskö för lediga studentbostäder. Vår kö
          är kostnadsfri och du kan ställa dig i kön när du har fyllt 16 år och
          söka en bostad när du fyllt 18 år. Allt behöver göra är att registrera
          dig nedan.
        </p>
      </div>

      <form
        id="registerform"
        onSubmit={registerUser}
        className="w-10/12 lg:w-8/12 mx-auto flex flex-col md:flex-row md:space-x-6"
      >
        <div className="flex flex-col w-full md:w-6/12">
          <h4 className="font-bold">Registrera dig kostnadsfritt</h4>

          <div className="flex flex-col mt-4">
            <input
              placeholder="FÖRNAMN"
              className="bg-gray-200 h-[2.4em] p-3 rounded-lg"
              type="text"
              id="firstname"
              name="firstname"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <input
              placeholder="EFTERNAMN"
              className="bg-gray-200 h-[2.4em] p-3 rounded-lg"
              type="text"
              id="lastname"
              name="lastname"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <input
              placeholder="E-MAIL"
              className="bg-gray-200 h-[2.4em] p-3 rounded-lg"
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-6/12 mt-10 md:mt-10">
          <div className="flex flex-col">
            <input
              placeholder="LÖSENORD"
              className="bg-gray-200 h-[2.4em] p-3 rounded-lg"
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <input
              placeholder="BEKRÄFTA LÖSENORD"
              className="bg-gray-200 h-[2.4em] p-3 rounded-lg"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <div className="flex mt-4 text-right">
            <label className="inline-flex items-center mx-auto md:ml-auto">
              <input
                type="checkbox"
                className="form-checkbox text-orange-500 rounded-lg"
                id="acceptTerms"
                name="acceptTerms"
                checked={data.acceptTerms}
                onChange={(e) =>
                  setData({ ...data, acceptTerms: e.target.checked })
                }
              />
              <p className="ml-4 text-md">Jag godkänner villkoren</p>
            </label>
          </div>
        </div>
      </form>

      <div className="w-10/12 mx-auto mt-4 text-center">
        <button
          onClick={registerUser}
          type="submit"
          className="my-4 mx-auto w-48 uppercase bg-orange-800 text-white py-2 px-6 rounded-2xl"
        >
          <p>Registrera</p>
        </button>
        <p>Har du redan ett konto?</p>
        <p>
          <Link to="/login">
            {" "}
            <span className="font-bold">Klicka här</span>
          </Link>{" "}
          för att logga in på ditt konto
        </p>
      </div>
    </>
  );
}
