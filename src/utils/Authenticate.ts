/* eslint-disable no-unused-vars */
import jsonwebtoken from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import Container from 'typedi';
import { UserService } from '../service';
// import { UserService } from "../services";
export interface Itoken {
  userId: number;
  iat: number;
  exp: number;
}

export class Authentication {
  static isToken(token: string) {
    return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
      token,
    );
  }

  static generateToken(userId: number): string {
    return jsonwebtoken.sign({ userId }, process.env.CRYPTO_SECRETKEY || '', {
      algorithm: 'HS512',
      expiresIn: '1d',
    });
  }

  static verifyToken(token: string): boolean {
    const data: Itoken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || '',
      { algorithms: ['HS512'] },
    ) as Itoken;

    if (data.iat * 1000 - new Date().getTime() > 0) return false;
    if (data.exp * 1000 - new Date().getTime() <= 0) return false;
    return true;
  }

  static refreshToken(token: string): string {
    const data: Itoken = jsonwebtoken.verify(
      token,
      process.env.CRYPTO_SECRETKEY || '',
      { algorithms: ['HS512'] },
    ) as Itoken;
    if (data.exp - new Date().getTime() / 1000 < 60 * 60) {
      return Authentication.generateToken(data.userId);
    }
    return token;
  }

  static getUserIdByToken(token: string): Pick<Itoken, 'userId'> {
    return jsonwebtoken.verify(token, process.env.CRYPTO_SECRETKEY || '', {
      algorithms: ['HS512'],
    }) as Pick<Itoken, 'userId'>;
  }

  static async currentUserChecker(action: Action) {
    const bearerToken = action.request.headers.authorization;
    if (!Authentication.isToken(bearerToken)) {
      return false;
    }
    const token = bearerToken.replace(/Bearer\s/, '');
    if (!Authentication.verifyToken(token)) {
      return false;
    }
    const userService = Container.get(UserService);
    const user = await userService.getById(
      Authentication.getUserIdByToken(token).userId,
    );

    action.request.query.user = user;
    return user;
  }
}
