import ThreadRepository from '../ThreadRepository.js';

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action and assert
    await expect(threadRepository.addThread({})).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(threadRepository.getThreadById('')).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      threadRepository.verifyThreadIsExistById(''),
    ).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(threadRepository.deleteThreadById('')).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
