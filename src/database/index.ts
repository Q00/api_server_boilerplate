import { createConnection } from 'typeorm';

import { typeOrmConfig } from './config';

export async function connectDatabase() {
  return createConnection(typeOrmConfig);
}
