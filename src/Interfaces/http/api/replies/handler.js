import autoBind from 'auto-bind';
import logger from '../../../../../utils/logging.js';
import AddReplyUseCase from '../../../../Applications/use_case/AddReplyUseCase.js';
import DeleteReplyUseCase from '../../../../Applications/use_case/DeleteReplyUseCase.js';

class RepliesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postCommentReplyHandler(req, h) {
    const { id: owner } = req.auth.credentials;
    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase.execute(
      req.payload,
      req.params,
      owner,
    );

    logger.info(
      `POST /threads/${req.params.threadId}/comments/${req.params.commentId}/replies`,
    );

    logger.info(
      `${addedReply.owner} added new reply on comment ${addedReply.commentId}`,
    );

    const response = h
      .response({
        status: 'success',
        data: {
          addedReply,
        },
      })
      .code(201);

    return response;
  }

  async deleteReplyHandler(req) {
    const { id: userId } = req.auth.credentials;
    const deleteReplyUseCase = this._container.getInstance(
      DeleteReplyUseCase.name,
    );
    await deleteReplyUseCase.execute(req.params, userId);

    logger.info(
      `DELETE /threads/${req.params.threadId}/comments/${req.params.commentId}/replies/${req.params.replyId}`,
    );

    return {
      status: 'success',
    };
  }
}

export default RepliesHandler;
