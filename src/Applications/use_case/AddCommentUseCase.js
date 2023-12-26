import AddComment from '../../Domains/comments/entities/AddComment.js';

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(payload, params, owner) {
    const { threadId } = params;
    await this._threadRepository.verifyThreadIsExistById(threadId);
    const addComment = new AddComment({
      ...payload,
      owner,
      threadId,
    });

    return this._commentRepository.addComment(addComment);
  }
}

export default AddCommentUseCase;
