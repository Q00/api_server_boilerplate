import { Authentication } from './Authenticate';

export const routingControllerOptions = {
  cors: true,
  // You should put currentUserChecker to use CurrentUser() in Controller
  currentUserChecker: Authentication.currentUserChecker,
  controllers: [`${__dirname}/../controllers/*.[jt]s`],
  middlewares: [`${__dirname}/../middlewares/*.[jt]s`],
  interceptors: [`${__dirname}/../interceptors/*.[jt]s`],
};
