import GetThreadUseCase from '../GetThreadUseCase.js';
import DetailComment from '../../../Domains/comments/entities/DetailComment.js';
import DetailReply from '../../../Domains/replies/entities/DetailReply.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ReplyRepository from '../../../Domains/replies/ReplyRepository.js';
import data from '../../../../utils/data.js';

describe('GetThreadUseCase', () => {
  it('should orchestrating get detail thread action correctly', async () => {
    // Arrange
    const params = {
      threadId: data.threads[0].id,
    };

    const thread = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      body: data.threads[0].body,
      date: data.threads[0].date,
      username: data.threads[0].username,
    };

    const comments = [
      new DetailComment({
        id: data.comments[0].id,
        username: data.comments[0].username,
        date: data.comments[0].date,
        content: data.comments[0].content,
        isDeleted: data.comments[0].is_deleted,
      }),

      new DetailComment({
        id: data.comments[1].id,
        username: data.comments[1].username,
        date: data.comments[1].date,
        content: data.comments[1].content,
        isDeleted: data.comments[1].is_deleted,
      }),
    ];

    const replies = [
      new DetailReply({
        id: data.replies[0].id,
        content: data.replies[0].content,
        date: data.replies[0].date,
        username: data.replies[0].username,
        commentId: data.comments[0].id,
        isDeleted: data.replies[0].is_deleted,
      }),

      new DetailReply({
        id: data.replies[1].id,
        content: data.replies[1].content,
        date: data.replies[1].date,
        username: data.replies[1].username,
        commentId: data.comments[1].id,
        isDeleted: data.replies[1].is_deleted,
      }),
    ];

    const expectedCommentsAndReplies = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      username: data.threads[0].username,
      date: data.threads[0].date,
      body: data.threads[0].body,
      comments: [
        {
          id: data.comments[0].id,
          content: data.comments[0].content,
          date: data.comments[0].date,
          username: data.comments[0].username,
          replies: [
            {
              id: data.replies[0].id,
              content: '**balasan telah dihapus**',
              date: data.replies[0].date,
              username: data.replies[0].username,
            },
          ],
        },
        {
          id: data.comments[1].id,
          content: '**komentar telah dihapus**',
          date: data.comments[1].date,
          username: data.comments[1].username,
          replies: [
            {
              content: data.replies[1].content,
              date: data.replies[1].date,
              id: data.replies[1].id,
              username: data.replies[1].username,
            },
          ],
        },
      ],
    };

    // Create dependency of use case
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    // Mocking needed function
    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(comments));
    mockReplyRepository.getRepliesByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(replies));

    // Create use case instance
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailThread = await getThreadUseCase.execute(params);

    // Assert
    expect(mockThreadRepository.getThreadById).toBeCalledWith(params.threadId);

    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      params.threadId,
    );

    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(
      params.threadId,
    );

    expect(detailThread).toEqual(expectedCommentsAndReplies);
  });
});
