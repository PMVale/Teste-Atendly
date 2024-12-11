import { getPayload } from "../auth";
import {Request, Response, NextFunction} from "express";

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization)
    const token = authorization?.includes('Bearer') ? authorization.split(' ')[1] : authorization;
    console.log(token)
    if (!token) {
      res.status(401).json({ message: 'Token not found' });
      return;
    }

    getPayload(token);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token'});
    return;
  }
};

export default validateAuth;