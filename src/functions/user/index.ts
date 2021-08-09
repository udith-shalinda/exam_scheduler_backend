import { middyfy } from "@libs/lambda";
import { UserController } from "./user.controller"

const _userController = new UserController();

export const login = middyfy(_userController.login);
export const register = middyfy(_userController.register);
