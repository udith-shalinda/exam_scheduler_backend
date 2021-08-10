import { DbConnection, getDbConnection } from "src/shared/dbContext/_dbContext";
import { middyfy } from "src/shared/lambda";
import { ExamService } from "src/services/exam/exam.service";
import { ExamController } from "./exam.controller";

const dbConnection: DbConnection = getDbConnection();
const _examService = new ExamService(dbConnection)
const _examController = new ExamController(_examService);

export const createExam = middyfy(_examController.createExam);
export const updateExam = middyfy(_examController.updateExam);
export const deleteExam = middyfy(_examController.deleteExam);
export const getAllExams = middyfy(_examController.getAllExams);

