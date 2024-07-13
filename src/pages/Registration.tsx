import { useState } from "react";

import { useRegistrationMutation } from "../redux/Feature/auth/authApi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/loging.png";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [registration, { isLoading }] = useRegistrationMutation();
  const navigate = useNavigate();

  const handelForm = async (e: any) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    await registration(userData).unwrap();
    navigate("/login");
  };

  return (
    <div className="relative">
      <img className="w-screen h-screen object-cover" src={logo} alt="" />
      <div className="absolute z-10 lg:top-[250px] top-[300px] left-[80px] lg:left-[600px] bg-slate-600 p-4 lg:p-10 rounded-md bg-opacity-50 ">
        <form
          className="flex flex-col gap-5 lg:w-[300px]"
          onSubmit={handelForm}
        >
          <input
            className="border  rounded-3xl px-3 w-full"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            className="border  rounded-3xl px-3 w-full"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="rounded-3xl px-3  border-purple-500 border-2"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <p className="text-white text-center">loading...</p>
          ) : (
            <button
              disabled={email.length === 0 && password.length === 0}
              className="bg-blue-600 rounded-3xl px-4 text-white"
            >
              Registration
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration;
