import pool from '../../database/postgres/pool.js';
import container from '../../container.js';
import createServer from '../createServer.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import AuthenticationTestHelper from '../../../../tests/AuthenticationsTestHelper.js';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper.js';
import RepliesTableTestHelper from '../../../../tests/RepliesTableTestHelper.js';

describe('/threads endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /threads', () => {
    it('should response with 401 when no access token provided ', async () => {
      // Arrange
      const requestPayload = {
        title: 'some thread',
        body: 'some content',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.statusCode).toEqual(401);
      expect(responseJson.error).toEqual('Unauthorized');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should response with 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        title: 'some thread',
      };
      const server = await createServer(container);
      const { accessToken } =
        await AuthenticationTestHelper.getAccessTokenHelper(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual(
        'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
      );
    });

    it('should response with 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        title: 'some thread',
        body: true,
      };

      const server = await createServer(container);
      const { accessToken } =
        await AuthenticationTestHelper.getAccessTokenHelper(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual(
        'tidak dapat membuat thread baru karena tipe data tidak sesuai',
      );
    });

    it('should response with 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: 'some thread',
        body: 'some content',
      };

      const server = await createServer(container);
      const { accessToken } =
        await AuthenticationTestHelper.getAccessTokenHelper(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread.id).toBeDefined();
      expect(responseJson.data.addedThread.title).toBeDefined();
      expect(responseJson.data.addedThread.owner).toBeDefined();
    });
  });

  describe('when GET /threads/{threadId}', () => {
    it('should response with 200 when get thread', async () => {
      // Arrange
      const server = await createServer(container);
      const threadId = 'thread-123';

      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
      });

      await ThreadsTableTestHelper.addNewThread({
        id: threadId,
        owner: 'user-123',
      });

      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        owner: 'user-123',
      });

      await RepliesTableTestHelper.addNewReply({
        id: 'reply-123',
        content: 'some reply',
        owner: 'user-123',
        commentId: 'comment-123',
      });

      await RepliesTableTestHelper.addNewReply({
        id: 'reply-456',
        content: 'some reply',
        owner: 'user-123',
        commentId: 'comment-123',
      });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      const {
        data: { thread },
      } = responseJson;
      expect(response.statusCode).toEqual(200);
      expect(typeof responseJson.data).toEqual('object');
      expect(typeof thread).toEqual('object');
      expect(thread.id).toBeDefined();
      expect(thread.title).toBeDefined();
      expect(thread.body).toBeDefined();
      expect(thread.date).toBeDefined();
      expect(thread.username).toBeDefined();
      expect(Array.isArray(thread.comments)).toBe(true);
      expect(Array.isArray(thread.comments[0].replies));
      expect(thread.comments[0].replies[0]).toBeDefined();
      expect(thread.comments[0].replies[1]).toBeDefined();
    });
  });
});
