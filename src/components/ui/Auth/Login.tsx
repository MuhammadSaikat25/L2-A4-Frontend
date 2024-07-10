import { useState } from "react";
import { useLoginMutation } from "../../../redux/Feature/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/Feature/auth/authSlice";
import verifyJwt from "../../../utils/verifyJwt";
import logo from "../../../assets/images/loging.png";
const LoginUl = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [Login] = useLoginMutation();

  const handelForm = async (e: any) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const res = await Login(userData).unwrap();
    const user = await verifyJwt(res.token);

    dispatch(setUser({ user, token: res.token }));
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
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="rounded-3xl px-3  border-purple-500 border-2"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 rounded-3xl px-4 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginUl;
