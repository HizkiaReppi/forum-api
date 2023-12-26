import AuthorizationError from '../../Commons/exceptions/AuthorizationError.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';
import AddedReply from '../../Domains/replies/entities/AddedReply.js';
import DetailReply from '../../Domains/replies/entities/DetailReply.js';
import ReplyRepository from '../../Domains/replies/ReplyRepository.js';

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addNewReply({ content, owner, commentId }) {
    const id = `reply-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: `INSERT INTO replies (id, content, owner, comment_id, date)
            VALUES($1, $2, $3, $4, $5)
            RETURNING id, content, owner`,
      values: [id, content, owner, commentId, date],
    };

    const { rows } = await this._pool.query(query);
    return new AddedReply({ ...rows[0] });
  }

  async getRepliesByThreadId(threadId) {
    const query = {
      text: `SELECT replies.id, replies.content, users.username,
             replies.comment_id, replies.date, replies.is_deleted
             FROM replies
             INNER JOIN comments ON replies.comment_id = comments.id
             INNER JOIN users ON replies.owner = users.id
             WHERE comments.thread_id = $1
             ORDER BY replies.date ASC`,
      values: [threadId],
    };

    const { rows } = await this._pool.query(query);
    return rows.map(
      (el) =>
        new DetailReply({
          ...el,
          commentId: el.comment_id,
          isDeleted: el.is_deleted,
        }),
    );
  }

  async verifyReplyIsExist({ threadId, commentId, replyId }) {
    const query = {
      text: `SELECT 1 FROM replies
             INNER JOIN comments
             ON replies.comment_id = comments.id
             INNER JOIN threads
             ON comments.thread_id = threads.id
             WHERE threads.id = $1
             AND comments.id = $2
             AND replies.id = $3`,
      values: [threadId, commentId, replyId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) throw new NotFoundError('balasan tidak ditemukan');
  }

  async verifyReplyOwner({ replyId, owner }) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1 AND owner = $2',
      values: [replyId, owner],
    };

    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new AuthorizationError(
        'anda tidak memiliki akses untuk menghapus balasan ini',
      );
    }
  }

  async deleteReplyById(replyId) {
    const query = {
      text: 'UPDATE replies SET is_deleted = true WHERE id = $1',
      values: [replyId],
    };

    await this._pool.query(query);
  }
}

export default ReplyRepositoryPostgres;
