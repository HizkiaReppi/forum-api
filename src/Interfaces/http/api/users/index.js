import UsersHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'users',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};
