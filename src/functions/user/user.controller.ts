import { formatJSONResponse } from "src/shared/apiGateway";
import { HandleException } from "src/shared/exceptionManager";
import { Context } from "aws-lambda";
import { UserService } from "src/services/user/user.service";
import { ILoginRes, ILoginUser } from "./user.interface";
import { AuthenticationHandler } from "src/shared/authenticationHandler";

export class UserController {
  constructor(private readonly _userService: UserService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * async login
   */
  @HandleException()
  // @AuthenticationHandler()
  public async login(event: any, _context: Context) {
    const body: ILoginUser = event.body;
    const data: ILoginRes = await this._userService.login(body);
    return formatJSONResponse({ data });
  }
  @HandleException()
  @AuthenticationHandler()
  public async whoAmI(event: any, _context: Context) {
    return formatJSONResponse({ user: event.user });
  }
  /**
   * async login
   */
  @HandleException()
  //  @AuthenticationHandler()
  public async register(event: any, _context: Context) {
    const res = await this._userService.registerUser(event.body);
    return formatJSONResponse({ data: res });
  }
}
