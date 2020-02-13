import { Authentication } from './Authenticate';

export const routingControllerOptions = {
  cors: true,
  // You should put currentUserChecker to use CurrentUser() in Controller
  currentUserChecker: Authentication.currentUserChecker,
  controllers: [`${__dirname}/../controller/*.[jt]s`],
  middlewares: [`${__dirname}/../middleware/*.[jt]s`],
  interceptors: [`${__dirname}/../interceptor/*.[jt]s`],
};
