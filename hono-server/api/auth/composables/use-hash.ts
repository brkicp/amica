import { sha256 } from "ohash";
import { JWT_SECRET_KEY } from "../constants";

export const useHash = () => {
  const hashPassword = (password: string) => sha256(password + JWT_SECRET_KEY);

  // ES6 version
  // const verifyPassword = (password: string, hash: string) =>
  //   hash === hashPassword(password);

  // ES5 version
  function verifyPassword(password: string, hash: string) {
    return hash === hashPassword(password);
  }

  return { hashPassword, verifyPassword };
};
