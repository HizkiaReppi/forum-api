import createServer from './Infrastructures/http/createServer.js';
import container from './Infrastructures/container.js';
import logger from '../utils/logging.js';

(async () => {
  const server = await createServer(container);
  await server.start();
  logger.info(`server start at ${server.info.uri}`);
})();
