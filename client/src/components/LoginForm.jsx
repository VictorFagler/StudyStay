import { React, useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get("/");
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
