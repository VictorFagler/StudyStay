import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div className="flex w-500 bg-blue-gray-100 flex-col">
        <h1>User Registration</h1>
        <form onSubmit={registerUser} className="">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="name"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="passwrd"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="border p-2 m-auto flex">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
