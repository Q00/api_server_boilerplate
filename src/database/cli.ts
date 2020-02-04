import { Signale } from 'signale';
import { Connection, createConnection, getConnection } from 'typeorm';
import yargs from 'yargs';
import { typeOrmConfig } from './config';

const signale = new Signale();

async function getDatabase(): Promise<Connection> {
  try {
    return getConnection();
  } catch (e) {
    return await createConnection(typeOrmConfig);
  }
}

async function schemaSync(db: Connection) {
  await db.synchronize();
}

async function runMigration(db: Connection) {
  await db.runMigrations();
}

async function main() {
  const { argv } = yargs;
  if (!argv._.length) {
    signale.error('not enoght length');
    return;
  }
  const order = argv._[0];
  signale.info(`order is ${order}`);
  const db = await getDatabase();
  switch (order) {
    case 'sync':
      await schemaSync(db);
      break;
    case 'migration':
      await runMigration(db);
      break;
    default:
      signale.error('does not match in orders');
      break;
  }
  signale.info('bye');
  await db.close();
  process.exit();
}

main();
