/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-07-10 08:34:49
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-07-23 12:22:53
 */

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class CommonService {
  public async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public async compirePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  public async generateJWT(payload: any) {
    return jwt.sign(payload, 'JWT', {
      expiresIn: 60 * 60 * 24 * 10,
    });
  }

  public static async verifyToken(token: string) {
    try {
      return jwt.verify(token, 'JWT');
    } catch (err) {
      return null;
    }
  }
}
