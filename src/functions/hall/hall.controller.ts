import { formatJSONResponse } from "src/shared/apiGateway";
import { AuthenticationHandler } from "src/shared/authenticationHandler";
import { HandleException } from "src/shared/exceptionManager";
import { Context } from "aws-lambda";
import { HallService } from "src/services/hall/hall.service";
import { IHall } from "./hall.interface";

export class HallController {
  constructor(private readonly _HallService: HallService) {
    this.createHall = this.createHall.bind(this);
    this.getAllHallsByExam = this.getAllHallsByExam.bind(this);
    this.updateHall = this.updateHall.bind(this);
    this.deleteHall = this.deleteHall.bind(this);
  }

  @HandleException()
  @AuthenticationHandler()
  public async createHall(event: any, _context: Context) {
    const body: IHall = event.body;
    const data: IHall = await this._HallService.createHall(body);
    return formatJSONResponse({ data });
  }

  @HandleException()
  @AuthenticationHandler()
  public async getAllHallsByExam(event: any, _context: Context) {
    const res = await this._HallService.getAllHallsByExam(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async updateHall(event: any, _context: Context) {
    const res = await this._HallService.updateHall(event.body);
    return formatJSONResponse({ data: res });
  }
  @HandleException()
  @AuthenticationHandler()
  public async deleteHall(event: any, _context: Context) {
    const res = await this._HallService.deleteHall(event.pathParameters.id);
    return formatJSONResponse({ data: res });
  }
}
