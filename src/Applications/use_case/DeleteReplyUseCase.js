class DeleteReplyUseCase {
  constructor({ replyRepository }) {
    this._replyRepository = replyRepository;
  }

  async execute(useCaseParams, userId) {
    const { threadId, commentId, replyId } = useCaseParams;
    await this._replyRepository.verifyReplyIsExist({
      threadId,
      commentId,
      replyId,
    });
    await this._replyRepository.verifyReplyOwner({ replyId, owner: userId });
    await this._replyRepository.deleteReplyById(replyId);
  }
}

export default DeleteReplyUseCase;
