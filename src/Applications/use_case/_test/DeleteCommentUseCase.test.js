import DeleteCommentUseCase from '../DeleteCommentUseCase.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import data from '../../../../utils/data.js';

describe('DeleteCommentUseCase', () => {
  it('should orchestrating delete comment correctly', async () => {
    // Arrange
    const params = {
      commentId: data.comments[0].id,
      threadId: data.threads[0].id,
    };

    const owner = data.users[0].id;

    const mockCommentRepository = new CommentRepository();

    // Mocking
    mockCommentRepository.verifyCommentIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // Create use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Act
    await deleteCommentUseCase.execute(params, owner);

    // Assert
    expect(mockCommentRepository.verifyCommentIsExist).toBeCalledWith({
      commentId: params.commentId,
      threadId: params.threadId,
    });

    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith({
      commentId: params.commentId,
      owner,
    });

    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(
      params.commentId,
    );
  });
});
