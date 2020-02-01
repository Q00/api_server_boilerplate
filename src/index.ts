import { runServer } from './server';

const PORT = Number(process.env.PORT) || 3000; //default port
const HOST = process.env.HOST || 'localhost';

async function startApplication() {
  try {
    await runServer(HOST, PORT);
    console.log(`server is running on ${PORT}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

startApplication();
