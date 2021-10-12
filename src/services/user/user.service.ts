import { ICreateUser, ILoginRes, ILoginUser, providerTypes, userRoleTypes } from "@functions/user/user.interface";
import {
  DbConnection,
  DbContext,
  Op,
  Repository,
} from "src/shared/dbContext/_dbContext";
import {
  BadRequestException,
  UnAuthorizedException,
} from "src/shared/exceptionManager";
import { User } from "../../models/user.model";
import { CommonService } from "../common/common.service";

export class UserService {
  private readonly _dbContext: DbContext = this._dbConnection.dbContext;
  private readonly _commonService: CommonService = new CommonService();

  constructor(private readonly _dbConnection: DbConnection) {console.log('user service');
  }

  public async registerUser(body: ICreateUser): Promise<boolean> {
    const { username, email, password, role, provider } = body;
    const user = await this.getUserByEmail(email);

    if (user) {
      if (user.username === username) {
        throw new BadRequestException("Username already taken");
      }
      if (user.email === email) {
        throw new BadRequestException("Email already taken");
      }
    }
    await this.createUser(username, password, email, role, provider);
    return true;
  }

  private async getUserByEmailUsername(username: string, email: string) {
    try {
      const query: any = { username };

      if (email) {
        query.email = email;
      }

      const userRepo: Repository<User> = this._dbContext.getRepository(User);
      const user: User | null = await userRepo.findOne({
        where: {
          [Op.or]: [query],
        },
      });
      return user;
    } catch (err) {
      //   const error: Error = <Error>err;
      //   this._logger.error('Error In Get User By Email Username or Phone', {
      //     message: error.message,
      //     stack: error.stack,
      //   });
    }
  }
  private async createUser(
    username: string,
    password: string,
    email: string,
    role?: userRoleTypes,
    provider?: providerTypes
  ): Promise<boolean> {
    try {
      const newPassword = await this._commonService.hashPassword(password);

      const userRepo: Repository<User> = await this._dbContext.getRepository(
        User
      );
      const body: any = {
        username,
        email: email,
        password: newPassword,
        role,
        provider
      };
      await (await userRepo.create(body)).save();
      // const [results, metadata] = await this._dbContext.query(`INSERT INTO "user" ("id","username","provider","role","email","password","created_at","updated_at") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING "id","username","provider","role","email","password","created_at","updated_at";`);
      return true;
    } catch (err) {
      console.log(err);
      //   const error: Error = <Error>err;
      //   this._logger.error('Error In Create User', {
      //     message: error.message,
      //     stack: error.stack,
      //   });
      return false;
    }
  }
  public async login(body: ILoginUser): Promise<ILoginRes | null> {
      console.log('user', body);
    const user = await this.getUserByEmail(body.email);
    
    if (!user) {
      throw new UnAuthorizedException("Invalid Email");
    }

    const isMatched = await this._commonService.compirePassword(
      body.password,
      user.password
    );
    if(!isMatched && user.provider !== providerTypes.email){
      throw new UnAuthorizedException("User is already signed in with other providers");
    }
    if (!isMatched) {
      throw new UnAuthorizedException("Inavlid Password");
    }
    const { email, username, createdAt, updatedAt, role } = user;
    const token = await this._commonService.generateJWT({
      email,
      username,
      role,
      createdAt,
      updatedAt,
    });
    user.password = undefined;
    return { user, token };
  }
  public async getUserByEmail(email: string): Promise<User | null | any> {
    // const userRepo: Repository<User> = this._dbContext.getRepository(User);
    const [results, metadata] = await this._dbContext.query(`SELECT "id", "username", "provider", "role", "email", "password", "created_at" AS "createdAt", "updated_at" AS "updatedAt" FROM "user" AS "User" WHERE "User"."email" = '${email}';`)
      console.log(results)
      return results[0];
    // return await userRepo.findOne({ where: { email } });
  }
}
