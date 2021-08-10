import { formatJSONResponse } from "@libs/apiGateway";
import { AuthenticationHandler } from "@libs/authenticationHandler";
import { HandleException } from "@libs/exceptionManager";
import { Context } from "aws-lambda";
import { ExamService } from "src/services/exam/exam.service";
import { ICreateExam, IExam } from "./exam.interface";

export class ExamController {
  constructor(private readonly _examService: ExamService) {
    this.createExam = this.createExam.bind(this);
    this.getAllExams = this.getAllExams.bind(this);
    this.updateExam = this.updateExam.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
  }

  @HandleException()
  @AuthenticationHandler()
  public async createExam(event: any, _context: Context) {
    const body: ICreateExam = event.body;
    const data: IExam = await this._examService.createExam(body);
    return formatJSONResponse({ data });
  }

  @HandleException()
  @AuthenticationHandler()
  public async getAllExams(event: any, _context: Context) {
    const res = await this._examService.getAllExams();
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async updateExam(event: any, _context: Context) {
    const res = await this._examService.updateExam(event.body);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async deleteExam(event: any, _context: Context) {
    const res = await this._examService.deleteExam(event.body);
    return formatJSONResponse({ data: res });
  }
}
