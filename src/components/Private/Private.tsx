import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const Private = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user?.email) {
    return <Navigate replace={true} to={"/login"}></Navigate>;
  }
  return <div>{children}</div>;
};

export default Private;
