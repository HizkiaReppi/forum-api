import DetailReply from '../DetailReply.js';

describe('a DetailReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'some reply',
      username: 'dicoding',
    };

    // Action & Assert
    expect(() => new DetailReply(payload)).toThrowError(
      'DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: {},
      date: [],
      username: 'dicoding',
      commentId: 'comment-123',
      isDeleted: 'yes',
    };

    // Action & Assert
    expect(() => new DetailReply(payload)).toThrowError(
      'DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create detailReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'some reply',
      date: '2023-09-28T02:46:32.762Z',
      username: 'dicoding',
      commentId: 'comment-123',
      isDeleted: true,
    };

    // Action
    const { id, content, date, username, commentId } = new DetailReply(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual('**balasan telah dihapus**');
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(commentId).toEqual(payload.commentId);
  });
});
