import { formatJSONResponse } from "src/shared/apiGateway";
import { AuthenticationHandler } from "src/shared/authenticationHandler";
import { HandleException } from "src/shared/exceptionManager";
import { Context } from "aws-lambda";
import { SubjectService } from "src/services/subject/subject.service";
import { ISubject } from "./subject.interface";

export class SubjectController {
  constructor(private readonly _SubjectService: SubjectService) {
    this.createSubject = this.createSubject.bind(this);
    this.getAllSubjectsByExam = this.getAllSubjectsByExam.bind(this);
    this.getAllTimeTableByYear = this.getAllTimeTableByYear.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
  }

  @HandleException()
  @AuthenticationHandler()
  public async createSubject(event: any, _context: Context) {
    const body: ISubject = event.body;
    const data: ISubject = await this._SubjectService.createSubject(body);
    return formatJSONResponse({ data });
  }

  @HandleException()
  @AuthenticationHandler()
  public async getAllTimeTableByYear(event: any, _context: Context) {    
    const res = await this._SubjectService.getAllTimeTableByYear(event.pathParameters.id, event.pathParameters.year);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async getAllSubjectsByExam(event: any, _context: Context) {
    const res = await this._SubjectService.getAllSubjectsByExam(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async updateSubject(event: any, _context: Context) {
    const res = await this._SubjectService.updateSubject(event.body);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async deleteSubject(event: any, _context: Context) {
    const res = await this._SubjectService.deleteSubject(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
}
