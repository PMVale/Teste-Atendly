import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const {usersController} = controllers;
const {validateAuth, validateUser} = middlewares;

const usersRouter = express.Router();

usersRouter.post("/register", validateUser, usersController.createUser);

usersRouter.get("/profile", validateAuth, usersController.getUser);

usersRouter.get("login", usersController.loginUser);

export default usersRouter;
