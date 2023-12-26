import autoBind from 'auto-bind';
import logger from '../../../../../utils/logging.js';
import AddCommentUseCase from '../../../../Applications/use_case/AddCommentUseCase.js';
import DeleteCommentUseCase from '../../../../Applications/use_case/DeleteCommentUseCase.js';

class CommentsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAddNewCommentHandler(req, h) {
    const { id: owner } = req.auth.credentials;
    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name,
    );

    const addedComment = await addCommentUseCase.execute(
      req.payload,
      req.params,
      owner,
    );

    logger.info(`POST /threads/${req.params.threadId}/comments`);
    logger.info(
      `${addedComment.owner} added new comment on thread ${addedComment.threadId}`,
    );

    const response = h
      .response({
        status: 'success',
        data: {
          addedComment,
        },
      })
      .code(201);

    return response;
  }

  async deleteCommentHandler(req) {
    const { id: userId } = req.auth.credentials;
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name,
    );

    await deleteCommentUseCase.execute(req.params, userId);

    logger.info(
      `DELETE /threads/${req.params.threadId}/comments/${req.params.commentId}`,
    );

    return {
      status: 'success',
    };
  }
}

export default CommentsHandler;
