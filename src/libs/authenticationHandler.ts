/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-07-10 07:57:10
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-07-23 12:28:10
 */
import { CommonService } from './../services/common/common.service';
import { DbConnection, getDbConnection } from './dbContext/_dbContext';
import { UnAuthorizedException } from './exceptionManager';
// import { JwtPayload } from 'jsonwebtoken';
// import { UserService } from '../../services/user/user.service';
// import { Logger } from '../logger';
// import { getDbConnection, DbConnection } from '@shared/dbContext/_dbContext';
function authenticationHandler(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (_target: object, _functionName: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      // Execute the actual method wrapped in the audit decorator and get the output
      // tslint:disable-next-line: no-invalid-this

      console.log();

      const token = args[0]?.headers.Authorization;

      if (!token) {
        console.log('token not found');
        
        throw new UnAuthorizedException('Unauthorized Action, No Token Found');
      }

      const decode: any = await CommonService.verifyToken(token);
      if (!decode) {
        throw new UnAuthorizedException('Unauthorized Action, Invalid Token');
      }
      // const _logger: Logger = new Logger();

      const dbConnection: DbConnection = getDbConnection();
      const user = await new UserService(dbConnection).getUserByUsername(decode.username);
      if (!user) {
        throw new UnAuthorizedException('Unauthorized Action, Invalid Token');
      }

      args[0].user = decode;
      // tslint:disable-next-line: no-invalid-this
      const output: object = await originalMethod.apply(this, args);
      return output;
    };

    return descriptor;
  };
}

export { authenticationHandler as AuthenticationHandler };
