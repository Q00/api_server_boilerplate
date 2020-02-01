import 'reflect-metadata';
import express, { Request, NextFunction, Response } from 'express';
import { Container } from 'typedi';
import './utils/env';
import { useContainer, useExpressServer } from 'routing-controllers';
import { routingControllerOptions } from './utils/routingConfig';
import swaggerUi from 'swagger-ui-express';

useContainer(Container);
const app = express();
console.log(`Current NODE_ENV is ${process.env.NODE_ENV}`);

useExpressServer(app, routingControllerOptions);
export function runServer(host: string, port: number) {
  return new Promise((resolve, reject) => {
    app.listen(port, host, (err: any) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

import { spec } from './utils/swagger';

app.use(swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(spec));

app.use((err: string, _req: Request, res: Response, _next: NextFunction) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.end(`{ result: false, error: ${err} }`);
});

export { app };
