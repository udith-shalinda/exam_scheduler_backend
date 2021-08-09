import { DbConnection, getDbConnection } from "@libs/dbContext/_dbContext";
import { middyfy } from "@libs/lambda";
import { UserService } from "src/services/user/user.service";
import { UserController } from "./user.controller"

const dbConnection: DbConnection = getDbConnection();
const _userService = new UserService(dbConnection)
const _userController = new UserController(_userService);

export const login = middyfy(_userController.login);
export const register = middyfy(_userController.register);
