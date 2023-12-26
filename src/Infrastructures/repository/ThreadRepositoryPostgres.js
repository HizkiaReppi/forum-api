import AddedThread from '../../Domains/threads/entities/AddedThread.js';
import ThreadRepository from '../../Domains/threads/ThreadRepository.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, date) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const { rows } = await this._pool.query(query);
    return new AddedThread({ ...rows[0] });
  }

  async getThreadById(threadId) {
    const query = {
      text: `SELECT threads.id,
             threads.title,
             threads.body,
             threads.date,
             users.username
             FROM threads INNER JOIN users
             ON threads.owner = users.id
             WHERE threads.id = $1`,
      values: [threadId],
    };

    const { rows, rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return rows[0];
  }

  async verifyThreadIsExistById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }

  async deleteThreadById(threadId) {
    const query = {
      text: 'DELETE FROM threads WHERE id = $1',
      values: [threadId],
    };

    await this._pool.query(query);
  }
}

export default ThreadRepositoryPostgres;
