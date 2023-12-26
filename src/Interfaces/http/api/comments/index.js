import CommentsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'comments',
  register: async (server, { container }) => {
    const commentsHandler = new CommentsHandler(container);
    server.route(routes(commentsHandler));
  },
};
