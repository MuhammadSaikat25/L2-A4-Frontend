import { useState } from "react";
import { useLoginMutation } from "../../../redux/Feature/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/Feature/auth/authSlice";
import verifyJwt from "../../../utils/verifyJwt";

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
    <div>
      <div className="bg-red-600 p-4">
        <form onSubmit={handelForm}>
          <input className="border" onChange={(e) => setEmail(e.target.value)} type="text" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>click</button>
        </form>
      </div>
    </div>
  );
};

export default LoginUl;
