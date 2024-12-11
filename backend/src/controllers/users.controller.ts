import {checkStatus, HttpStatusKeys} from "../utils/checkStatus";
import services from "../services";
import { Request, Response } from "express";

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

const usersController = {
  createUser,
  loginUser,
};

export default usersController;