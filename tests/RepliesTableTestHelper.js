import pool from '../src/Infrastructures/database/postgres/pool.js';

const RepliesTableTestHelper = {
  async addNewReply({
    id = 'reply-123',
    content = 'some reply',
    owner = 'user-123',
    commentId = 'comment-123',
    isDeleted = false,
    date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, owner, commentId, isDeleted, date],
    };

    await pool.query(query);
  },

  async findReplyById(replyId) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [replyId],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

export default RepliesTableTestHelper;
