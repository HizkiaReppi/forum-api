import AddCommentUseCase from '../AddCommentUseCase.js';
import AddedComment from '../../../Domains/comments/entities/AddedComment.js';
import NewComment from '../../../Domains/comments/entities/AddComment.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import data from '../../../../utils/data.js';

describe('AddCommentUseCase', () => {
  it('should orchestrating add comment function', async () => {
    // Arrange
    const payload = {
      content: data.comments[0].content,
    };

    const params = {
      threadId: data.threads[0].id,
    };

    const owner = data.users[0].id;

    const expectedAddedComment = new AddedComment({
      id: data.comments[0].id,
      content: data.comments[0].content,
      owner,
    });

    // creating depedency of use case
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    // mocking needed function
    mockThreadRepository.verifyThreadIsExistById = jest.fn(() =>
      Promise.resolve(),
    );

    mockCommentRepository.addComment = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedComment({
          id: data.comments[0].id,
          content: payload.content,
          owner,
        }),
      ),
    );

    // create use case instance
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(
      payload,
      params,
      owner,
    );

    // Assert
    expect(mockThreadRepository.verifyThreadIsExistById).toBeCalledWith(
      params.threadId,
    );

    expect(mockCommentRepository.addComment).toBeCalledWith(
      new NewComment({
        content: payload.content,
        owner,
        threadId: params.threadId,
      }),
    );

    expect(addedComment).toStrictEqual(expectedAddedComment);
  });
});
