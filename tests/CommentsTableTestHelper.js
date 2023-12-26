import pool from '../src/Infrastructures/database/postgres/pool.js';

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'some comment',
    owner = 'user-123',
    threadId = 'thread-123',
    isDeleted = false,
    date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, owner, threadId, isDeleted, date],
    };

    await pool.query(query);
  },

  async findCommentById(commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

export default CommentsTableTestHelper;
