import jwt, {Algorithm} from "jsonwebtoken";
import bcrypt from 'bcrypt';

const secret: string = process.env.JWT_SECRET || 'secret';

const JWT_CONFIG = { algorithm: 'HS256' as Algorithm };

type Payload = {
  name: string,
  email: string,
}

const createToken = (payload: Payload) => jwt.sign(payload, secret, JWT_CONFIG);

const getPayload = (token: string) => jwt.verify(token, secret);

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword
};

const validatePassword = async (password: string, hashedPassword: string) => {
  const check = await bcrypt.compare(password, hashedPassword);
  return check
}

export { createToken, getPayload, hashPassword, validatePassword };