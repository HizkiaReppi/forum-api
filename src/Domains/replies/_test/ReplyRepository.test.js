import ReplyRepository from '../ReplyRepository.js';

describe('ReplyRepository interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const replyRepository = new ReplyRepository();

    // Action & Assert
    await expect(replyRepository.addNewReply({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(replyRepository.deleteReplyById('')).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(replyRepository.getRepliesByThreadId('')).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(replyRepository.verifyReplyIsExist({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(replyRepository.verifyReplyOwner({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
