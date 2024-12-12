import { Op } from "sequelize";
import { createToken, hashPassword, validatePassword } from "../auth";
import User from '../database/models/User'


type Body = {
  name: string,
  email: string,
  password: string,
}

type Login = {
  email: string,
  password: string,
}

type Profile = {
  email: string
}

const createUser = async (data: Body) => {
  const user = await User.findAll({where: {
    [Op.and]: [{ email: data.email}, {password: data.password}]
  }});

  if (user.length !== 0) {
    return {status: 'CONFLICT', data: { message: 'User already registered' }};
  }

  const hashedPassword = await hashPassword(data.password);

  const newUser = {
    ...data,
    password: hashedPassword
  };

  await User.create({ ...newUser });

  return {status: 'SUCCESSFUL', data: { name: newUser.name, email: newUser.email }};

};

const loginUser = async (data: Login) => {
  const user = await User.findOne({where: {
    email: data.email
  }});
  
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  };

  const check = await validatePassword(data.password, user.password);

  if (!check) {
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password'}}
  };

  const token = createToken({name: user.name, email: user.email});

  return { status: 'SUCCESSFUL', data: {name: user.name, email: user.email, token}}

}

const getUser = async (data: Profile) => {
  const user = await User.findOne({where: {
    email: data.email
  }});
  
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  };

  return { status: 'SUCCESSFUL', data: {name: user.name, email: user.email}}
}

const usersService = {
  createUser,
  loginUser,
  getUser
}

export default usersService;
