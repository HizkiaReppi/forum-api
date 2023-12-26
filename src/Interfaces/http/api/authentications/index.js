import routes from './routes.js';
import AuthenticationsHandler from './handler.js';

export default {
  name: 'authentications',
  register: async (server, { container }) => {
    const authenticationsHandler = new AuthenticationsHandler(container);
    server.route(routes(authenticationsHandler));
  },
};
