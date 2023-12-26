import CommentRepository from '../../Domains/comments/CommentRepository.js';
import AddedComment from '../../Domains/comments/entities/AddedComment.js';
import DetailComment from '../../Domains/comments/entities/DetailComment.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';
import AuthorizationError from '../../Commons/exceptions/AuthorizationError.js';

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, owner, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: `INSERT INTO comments (id, content, owner, thread_id, date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, content, owner`,
      values: [id, content, owner, threadId, date],
    };

    const { rows } = await this._pool.query(query);
    return new AddedComment({ ...rows[0] });
  }

  async deleteCommentById(commentId) {
    const query = {
      text: 'UPDATE comments SET is_deleted = TRUE WHERE id = $1',
      values: [commentId],
    };

    await this._pool.query(query);
  }

  async verifyCommentIsExist({ commentId, threadId }) {
    const query = {
      text: `SELECT * FROM comments
             INNER JOIN threads
             ON comments.thread_id = threads.id
             WHERE comments.id = $1 AND threads.id = $2`,
      values: [commentId, threadId],
    };

    const { rowCount } = await this._pool.query(query);

    if (!rowCount) throw new NotFoundError('comment tidak ditemukan');
  }

  async verifyCommentOwner({ commentId, owner }) {
    const query = {
      text: 'SELECT 1 FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, owner],
    };

    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new AuthorizationError(
        'anda tidak memiliki akses untuk menghapus komen ini',
      );
    }
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT comments.id,
             users.username,
             comments.date,
             comments.content,
             comments.is_deleted
             FROM comments INNER JOIN users
             ON comments.owner = users.id
             WHERE comments.thread_id = $1
             ORDER BY comments.date ASC`,
      values: [threadId],
    };

    const { rows } = await this._pool.query(query);
    return rows.map(
      (element) =>
        new DetailComment({ ...element, isDeleted: element.is_deleted }),
    );
  }
}

export default CommentRepositoryPostgres;
