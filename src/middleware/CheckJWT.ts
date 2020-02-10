import {
  ExpressMiddlewareInterface,
  Middleware,
  Req,
  Res,
} from 'routing-controllers';
import express from 'express';
import { Authentication } from '../utils/Authenticate';

@Middleware({ type: 'before' })
export class CheckJwt implements ExpressMiddlewareInterface {
  // interface implementation is optional
  constructor() {}

  use(
    @Req() request: express.Request,
    @Res() response: express.Response,
    // tslint:disable-next-line: no-any
    next: (err?: any) => any,
  ) {
    const jwt: string = request.headers.authorization as string;
    if (jwt !== undefined) {
      const bearerToken = jwt.replace(/Bearer\s/, '');
      const token = Authentication.refreshToken(bearerToken);
      response.setHeader('authorization', `Bearer ${token}`);
    }
    next();
  }
}
