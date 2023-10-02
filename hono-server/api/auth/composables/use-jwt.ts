import { SignJWT } from "jose";
import { JWT_SECRET_KEY } from "../constants";

export const useJwt = () => {
  const sign = async (uid: number) => {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(uid.toString())
      .setIssuedAt()
      .setExpirationTime("96h")
      .sign(new TextEncoder().encode(JWT_SECRET_KEY));

    return token;
  };

  return { sign };
};
