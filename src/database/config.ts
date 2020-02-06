import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { NamingStrategy } from './NamingStrategy';
import '../utils/env';
const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  namingStrategy: new NamingStrategy(),
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: [`${path.join(__dirname, '..', 'models')}/**.[tj]s`],
  migrations: [`${path.join(__dirname, '..', 'models')}/migration/**.[tj]s`],
};

export { typeOrmConfig };
