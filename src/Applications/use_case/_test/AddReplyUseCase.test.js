import AddReplyUseCase from '../AddReplyUseCase.js';
import AddedReply from '../../../Domains/replies/entities/AddedReply.js';
import NewReply from '../../../Domains/replies/entities/NewReply.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ReplyRepository from '../../../Domains/replies/ReplyRepository.js';
import data from '../../../../utils/data.js';

describe('AddReplyUseCase', () => {
  it('should orchestrating AddReply action correctly', async () => {
    // Arrange
    const payload = {
      content: data.replies[0].content,
    };

    const params = {
      threadId: data.threads[0].id,
      commentId: data.comments[0].id,
    };

    const owner = data.users[0].id;

    const expectedAddedReply = new AddedReply({
      id: data.replies[0].id,
      content: data.replies[0].content,
      owner,
    });

    // create dependency use case
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    // mocking
    mockCommentRepository.verifyCommentIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.addNewReply = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedReply({
          id: 'reply-123',
          content: payload.content,
          owner,
        }),
      ),
    );

    // creating use case instance
    const addReplyUseCase = new AddReplyUseCase({
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Acction
    const addedReply = await addReplyUseCase.execute(payload, params, owner);

    // Assert
    expect(mockCommentRepository.verifyCommentIsExist).toBeCalledWith({
      commentId: params.commentId,
      threadId: params.threadId,
    });

    expect(mockReplyRepository.addNewReply).toBeCalledWith(
      new NewReply({
        content: payload.content,
        owner,
        commentId: params.commentId,
      }),
    );

    expect(addedReply).toStrictEqual(expectedAddedReply);
  });
});
