import {Request, Response, NextFunction} from "express";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password} = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Name, Email and Password are required'});
    return;
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid Email'})
    return;
  }

  next();

};

export default validateUser;