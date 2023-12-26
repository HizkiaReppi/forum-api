import DeleteReplyUseCase from '../DeleteReplyUseCase.js';
import ReplyRepository from '../../../Domains/replies/ReplyRepository.js';
import data from '../../../../utils/data.js';

describe('DeleteReplyUseCase', () => {
  it('should orchestrating delete reply correctly', async () => {
    // Arrange
    const params = {
      commentId: data.comments[0].id,
      threadId: data.threads[0].id,
      replyId: data.replies[0].id,
    };

    const owner = data.users[0].id;

    // create use case depedency
    const mockReplyRepository = new ReplyRepository();

    // mocking
    mockReplyRepository.verifyReplyIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.verifyReplyOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.deleteReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    // Action
    await deleteReplyUseCase.execute(params, owner);

    // Assert
    expect(mockReplyRepository.verifyReplyIsExist).toBeCalledWith({
      threadId: params.threadId,
      commentId: params.commentId,
      replyId: params.replyId,
    });

    expect(mockReplyRepository.verifyReplyOwner).toBeCalledWith({
      replyId: params.replyId,
      owner,
    });

    expect(mockReplyRepository.deleteReplyById).toBeCalledWith(params.replyId);
  });
});
