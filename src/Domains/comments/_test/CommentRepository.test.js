import CommentRepository from '../CommentRepository.js';

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action & Assert
    await expect(commentRepository.addComment({})).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(commentRepository.deleteCommentById({})).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      commentRepository.verifyCommentIsExist({}),
    ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(commentRepository.verifyCommentOwner({})).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      commentRepository.getCommentsByThreadId({}),
    ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
