const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postAddNewCommentHandler,
    options: {
      auth: 'forum_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'forum_api_jwt',
    },
  },
];

export default routes;
