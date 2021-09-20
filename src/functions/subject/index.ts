import { DbConnection, getDbConnection } from "src/shared/dbContext/_dbContext";
import { middyfy } from "src/shared/lambda";
import { SubjectService } from "src/services/subject/subject.service";
import { SubjectController } from "./subject.controller";

const dbConnection: DbConnection = getDbConnection();
const _SubjectService = new SubjectService(dbConnection)
const _SubjectController = new SubjectController(_SubjectService);

export const createSubject = middyfy(_SubjectController.createSubject);
export const updateSubject = middyfy(_SubjectController.updateSubject);
export const deleteSubject = middyfy(_SubjectController.deleteSubject);
export const getAllSubjectsByExam = middyfy(_SubjectController.getAllSubjectsByExam);
export const getAllTimeTableByYear = middyfy(_SubjectController.getAllTimeTableByYear);


