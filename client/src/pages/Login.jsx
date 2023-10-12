import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex flex-col">
        <div className="mx-auto">
          <h1 className="text-4xl pb-4 pt-6">Logga in</h1>
          <LoginForm />
          <Link to="/register" className="text-black">
            <p className="pt-4"> Registrera konto</p>
          </Link>
        </div>
      </div>
    </>
  );
}
