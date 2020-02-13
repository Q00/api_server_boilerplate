import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { NextFunction, Request, Response } from 'express';
import { ApiLogService } from '../service';
import Container from 'typedi';
import { Method } from '../model/Enum';

@Middleware({ type: 'before' })
export class StartTimerMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next: NextFunction): void {
    request.query.startTime = String(new Date().getTime());
    next();
  }
}

@Middleware({ type: 'after' })
export class EndTimerMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const time = new Date().getTime();
    const responseTime = time - Number(request.query.startTime);
    const user = request.query.user;
    const url = request.url;
    const method = request.method as Method;

    const apiLogService = Container.get(ApiLogService);
    await apiLogService.save({ user, url, method, responseTime });
    next();
  }
}
