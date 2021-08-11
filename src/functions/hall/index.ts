import { DbConnection, getDbConnection } from "src/shared/dbContext/_dbContext";
import { middyfy } from "src/shared/lambda";
import { HallService } from "src/services/hall/hall.service";
import { HallController } from "./hall.controller";

const dbConnection: DbConnection = getDbConnection();
const _HallService = new HallService(dbConnection)
const _HallController = new HallController(_HallService);

export const createHall = middyfy(_HallController.createHall);
export const updateHall = middyfy(_HallController.updateHall);
export const deleteHall = middyfy(_HallController.deleteHall);
export const getAllHallsByExam = middyfy(_HallController.getAllHallsByExam);

