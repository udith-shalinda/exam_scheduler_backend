import { TimeTableService } from "src/services/time_table/time_table.service";
import { DbConnection, getDbConnection } from "src/shared/dbContext/_dbContext";
import { middyfy } from "src/shared/lambda";
import { TimeTableController } from "./time_table.controller";

const dbConnection: DbConnection = getDbConnection();
const _TimeTableService = new TimeTableService(dbConnection)
const _TimeTableController = new TimeTableController(_TimeTableService);

export const createTimeTable = middyfy(_TimeTableController.createTimeTable);
export const updateTimeTable = middyfy(_TimeTableController.updateTimeTable);
export const deleteTimeTable = middyfy(_TimeTableController.deleteTimeTable);
export const getAllTimeTablesByExam = middyfy(_TimeTableController.getAllTimeTablesByExam);

