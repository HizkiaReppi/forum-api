import ThreadsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'threads',
  register: async (server, { container }) => {
    const threadsHandler = new ThreadsHandler(container);
    server.route(routes(threadsHandler));
  },
};
