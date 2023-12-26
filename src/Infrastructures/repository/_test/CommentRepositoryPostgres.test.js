import CommentRepositoryPostgres from '../CommentRepositoryPostgres.js';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import AddComment from '../../../Domains/comments/entities/AddComment.js';
import AddedComment from '../../../Domains/comments/entities/AddedComment.js';
import DetailComment from '../../../Domains/comments/entities/DetailComment.js';
import NotFoundError from '../../../Commons/exceptions/NotFoundError.js';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError.js';
import pool from '../../database/postgres/pool.js';

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addaddComment function', () => {
    it('should persist add new comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'some comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      // add user
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      // Assert
      const comment = await CommentsTableTestHelper.findCommentById(
        'comment-123',
      );

      expect(comment).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'some comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      // add user
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(
        addComment,
      );

      // Assert
      expect(addedComment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          content: 'some comment',
          owner: 'user-123',
        }),
      );
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment by id', async () => {
      // Arrange
      const addedComment = {
        id: 'comment-123',
        threadId: 'thread-123',
      };

      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      // add comment
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteCommentById(addedComment.id);
      const comment = await CommentsTableTestHelper.findCommentById(
        addedComment.id,
      );

      // Assert
      expect(comment[0].is_deleted).toEqual(true);
    });
  });

  describe('verifyCommentIsExist function', () => {
    it('should throw NotFoundError when comment not found', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      expect(() =>
        commentRepositoryPostgres.verifyCommentIsExist({
          commentId: 'comment-123',
          threadId: 'thread-123',
        }),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when comment is found', async () => {
      // Arrange
      // add user
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      // add comment
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyCommentIsExist({
          commentId: 'comment-123',
          threadId: 'thread-123',
        }),
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw AuthorizationError when you no access to delete the comment', async () => {
      // Arrange
      // add user
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      // add comment
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      expect(() =>
        commentRepositoryPostgres.verifyCommentOwner({
          commentId: 'comment-123',
          owner: 'user-122',
        }),
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not to throw AuthorizationError when you have access to delete the comment', async () => {
      // Arrange

      // add user
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'dicoding',
      });

      // add new thread
      await ThreadsTableTestHelper.addNewThread({
        title: 'some thread',
        body: 'some body thread',
      });

      // add comment
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyCommentOwner({
          commentId: 'comment-123',
          owner: 'user-123',
        }),
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe('getCommentsByThreadId function', () => {
    it('should return all comment from a thread correctly', async () => {
      // Arrange
      const user = {
        id: 'user-123',
        username: 'dicoding',
      };

      const newThread = {
        id: 'thread-123',
      };

      const firstComment = {
        id: 'comment-123',
        date: '2023-09-28T02:46:32.762Z',
        content: 'some comment',
        owner: 'user-123',
        isDeleted: false,
      };

      const secondComment = {
        id: 'comment-456',
        date: '2023-09-28T03:46:32.762Z',
        content: 'some comment',
        owner: 'user-123',
        isDeleted: false,
      };

      // add user
      await UsersTableTestHelper.addUser(user);

      // add new thread
      await ThreadsTableTestHelper.addNewThread(newThread);

      // add first and second comment
      await CommentsTableTestHelper.addComment(firstComment);
      await CommentsTableTestHelper.addComment(secondComment);

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsByThreadId(
        'thread-123',
      );

      // Assert
      expect(comments).toEqual([
        new DetailComment({ ...firstComment, username: 'dicoding' }),
        new DetailComment({ ...secondComment, username: 'dicoding' }),
      ]);
    });
  });
});
