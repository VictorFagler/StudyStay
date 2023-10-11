import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
      <div className="flex flex-col">
        <form onSubmit={loginUser}>
          <label>Email</label>
          <input
            className="flex"
            type="email"
            placeholder="Enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            className="flex"
            type="password"
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="border p-2 bg-blue-gray-300" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
