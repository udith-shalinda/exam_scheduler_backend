import { formatJSONResponse } from "src/shared/apiGateway";
import { AuthenticationHandler } from "src/shared/authenticationHandler";
import { HandleException } from "src/shared/exceptionManager";
import { Context } from "aws-lambda";
import { ICreateTimeTable, ITimeTable } from "./time_table.interface";
import { TimeTableService } from "src/services/time_table/time_table.service";

export class TimeTableController {
  constructor(private readonly _TimeTableService: TimeTableService) {
    this.createTimeTable = this.createTimeTable.bind(this);
    this.getAllTimeTablesByExam = this.getAllTimeTablesByExam.bind(this);
    this.updateTimeTable = this.updateTimeTable.bind(this);
    this.deleteTimeTable = this.deleteTimeTable.bind(this);
  }

  @HandleException()
  @AuthenticationHandler()
  public async createTimeTable(event: any, _context: Context) {
    const body: ICreateTimeTable[] = event.body;
    const data: ITimeTable[] = await this._TimeTableService.createTimeTable(body);
    return formatJSONResponse({ data });
  }

  @HandleException()
  @AuthenticationHandler()
  public async getAllTimeTablesByExam(event: any, _context: Context) {
    const res = await this._TimeTableService.getAllTimeTablesByExam(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async updateTimeTable(event: any, _context: Context) {
    const res = await this._TimeTableService.updateTimeTable(event.body);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async deleteTimeTable(event: any, _context: Context) {
    const res = await this._TimeTableService.deleteTimeTable(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
}
