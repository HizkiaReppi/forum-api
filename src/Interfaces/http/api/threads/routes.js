const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postAddThreadHandler,
    options: {
      auth: 'forum_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadHandler,
  },
];

export default routes;
