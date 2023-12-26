import pool from '../src/Infrastructures/database/postgres/pool.js';

const ThreadsTableTestHelper = {
  async addNewThread({
    id = 'thread-123',
    title = 'some thread',
    body = 'some body thread',
    owner = 'user-123',
    date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async findThreadById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

export default ThreadsTableTestHelper;
