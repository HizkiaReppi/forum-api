import NewReply from '../../Domains/replies/entities/NewReply.js';

class AddReplyUseCase {
  constructor({ commentRepository, replyRepository }) {
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(payload, params, owner) {
    const { threadId, commentId } = params;
    await this._commentRepository.verifyCommentIsExist({ commentId, threadId });
    const newReply = new NewReply({
      ...payload,
      owner,
      commentId,
    });

    return this._replyRepository.addNewReply(newReply);
  }
}

export default AddReplyUseCase;
