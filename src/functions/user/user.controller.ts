import { formatJSONResponse } from "@libs/apiGateway";
import { AuthenticationHandler } from "@libs/authenticationHandler";
import { HandleException } from "@libs/exceptionManager";
import { APIGatewayProxyEvent } from "aws-lambda";
import { Context } from "vm";

export class UserController {
    constructor(){
        this.login = this.login.bind(this);
    }

    /**
     * async login
     */
    @HandleException()
    @AuthenticationHandler()
    public async login(event: APIGatewayProxyEvent, _context: Context) {
        console.log('login');
        
        return formatJSONResponse({
            message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
            event,
          });
    }
    /**
     * async login
     */
     @HandleException()
    //  @AuthenticationHandler()
     public async register(event: APIGatewayProxyEvent, _context: Context) {
         console.log(event.body);
         
         return formatJSONResponse({
             message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
             event,
           });
     }
}