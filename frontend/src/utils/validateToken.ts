import { jwtDecode } from "jwt-decode";

const validateToken = (token: string) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return false;

    const time = Math.floor(Date.now() / 1000);

    return decoded.exp > time;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export default validateToken;
