import {checkStatus, HttpStatusKeys} from "../utils/checkStatus";
import services from "../services";
import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

const {usersService} = services;

const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  const user = await usersService.createUser(data);
  res.status(checkStatus(user.status as HttpStatusKeys)).json(user.data);
};

const loginUser = async (req: Request, res: Response) => {
  const user = await usersService.loginUser(req.body);
  res.status(checkStatus(user.status as HttpStatusKeys)).json(user.data);
}

type Payload = {
  email: string,
  name: string
}

const getUser = async (req: Request, res: Response) => {
  const {authorization} = req.headers;
  const token = authorization?.split(' ')[1];
  const data = jwtDecode(token as string) as Payload;
  const user = await usersService.getUser({email: data.email});
  res.status(checkStatus(user.status as HttpStatusKeys)).json(user.data);
}

const usersController = {
  createUser,
  loginUser,
  getUser
};

export default usersController;