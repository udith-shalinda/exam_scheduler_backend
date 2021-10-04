import { userRoleTypes } from '@functions/user/user.interface';
import { UserService } from 'src/services/user/user.service';
import { CommonService } from '../services/common/common.service';
import { DbConnection, getDbConnection } from './dbContext/_dbContext';
import { UnAuthorizedException } from './exceptionManager';


function adminAuthHandler(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (_target: object, _functionName: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      // Execute the actual method wrapped in the audit decorator and get the output
      // tslint:disable-next-line: no-invalid-this


      const token = args[0]?.headers.Authorization || args[0]?.headers.authorization;

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
      const user = await new UserService(dbConnection).getUserByEmail(decode.email);
      if (!user) {
        throw new UnAuthorizedException('Unauthorized Action, Invalid Token');
      }else if(user.role !== userRoleTypes.admin){
        throw new UnAuthorizedException('Unauthorized Action, User doesn\'t have admin permissions');
      }

      args[0].user = decode;
      // tslint:disable-next-line: no-invalid-this
      const output: object = await originalMethod.apply(this, args);
      return output;
    };

    return descriptor;
  };
}

export { adminAuthHandler as AdminAuthHandler };
