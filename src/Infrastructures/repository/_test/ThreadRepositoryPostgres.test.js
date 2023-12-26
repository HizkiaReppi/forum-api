import ThreadRepositoryPostgres from '../ThreadRepositoryPostgres.js';
import NewThread from '../../../Domains/threads/entities/NewThread.js';
import AddedThread from '../../../Domains/threads/entities/AddedThread.js';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper.js';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper.js';
import NotFoundError from '../../../Commons/exceptions/NotFoundError.js';
import pool from '../../database/postgres/pool.js';

describe('ThreadRepositoryPostgress', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addNewThread function', () => {
    it('should persist add new thread correctly', async () => {
      // Arrange

      // Add User
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      const newThread = new NewThread({
        title: 'some thread',
        body: 'some content',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await threadRepositoryPostgres.addNewThread(newThread);

      // Assert
      const thread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(thread).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange

      // Add User
      await UsersTableTestHelper.addUser({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      const newThread = new NewThread({
        title: 'some thread',
        body: 'some content',
        owner: 'user-123',
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedThread = await threadRepositoryPostgres.addNewThread(
        newThread,
      );

      // Assert
      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: 'thread-123',
          title: 'some thread',
          owner: 'user-123',
        }),
      );
    });
  });

  describe('verifyThreadIsExistById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      expect(() =>
        threadRepositoryPostgres.verifyThreadIsExistById('thread-123'),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when thread is found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addNewThread({ id: 'thread-123' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadIsExistById('thread-123'),
      ).resolves.not.toThrow(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should return NotFoundError when thread is not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      expect(() =>
        threadRepositoryPostgres.getThreadById('thread-123'),
      ).rejects.toThrowError(NotFoundError);
    });

    it('should return thread correctly', async () => {
      // Arrange
      const newThread = {
        id: 'thread-123',
        title: 'some thread',
        body: 'some body thread',
        date: new Date().toISOString(),
        owner: 'user-123',
      };

      const expectedThread = {
        id: 'thread-123',
        title: 'some thread',
        body: 'some body thread',
        date: new Date().toISOString(),
        username: 'dicoding',
      };

      // Add user
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      // Add thread
      await ThreadsTableTestHelper.addNewThread(newThread);

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepositoryPostgres.getThreadById('thread-123');

      // Assert
      expect(thread).toStrictEqual(expectedThread);
    });
  });
});
