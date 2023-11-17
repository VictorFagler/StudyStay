import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
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
        setData({ name: "", email: "", password: "" });
        toast.success("Register Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-[26em]">
        <img
          src="registerimage.jpg"
          alt="registerimage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="content-container w-10/12 mx-auto text-center flex flex-col items-center py-6">
        <h1>Gå med i vår bostadskö</h1>
        <p className="w-8/12">
          Välkommen till StudyStays bostadskö för lediga studentbostäder. Vår kö
          är kostnadsfri och du kan ställa dig i kön när du har fyllt 16 år och
          söka en bostad när du fyllt 18 år. Allt behöver göra är att registrera
          dig nedan.
        </p>
        <img src="studystay-logo.png" alt="studystaylogo" className="py-10" />
        <form
          id="registerform"
          onSubmit={registerUser}
          className="mb-10 w-8/12 flex flex-row mx-auto"
        >
          <div className="w-6/12 mx-20">
            <div className="flex flex-col justify-between">
              <input
                placeholder="Förnamn"
                className="bg-gray-200 h-[2em] p-3"
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
                placeholder="Efternamn"
                className="bg-gray-200 h-[2em] p-3"
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
                placeholder="E-mail"
                className="bg-gray-200 h-[2em] p-3 "
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="w-6/12 ml-4">
            <div className="flex flex-col">
              <input
                placeholder="Lösenord"
                className="bg-gray-200 h-[2em] p-3 "
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
                placeholder="Bekräfta Lösenord"
                className="bg-gray-200 h-[2em] p-3"
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
            <div className="flex flex-col mt-4 text-right">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-orange-500"
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
        <button
          onClick={registerUser}
          type="submit"
          className="mt-6 w-48 mx-auto uppercase bg-orange-800 text-white py-2 px-6 rounded-3xl"
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
