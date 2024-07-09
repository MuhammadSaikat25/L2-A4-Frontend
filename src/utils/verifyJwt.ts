import { jwtDecode } from "jwt-decode";
const verifyJwt = async (token: string) => {
  const user =await jwtDecode(token);
  return user;
};

export default verifyJwt;
