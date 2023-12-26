import NewReply from '../NewReply.js';

describe('a NewReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'some reply',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new NewReply(payload)).toThrowError(
      'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      content: 'some reply',
      owner: {},
      commentId: [],
    };

    // Action & Assert
    expect(() => new NewReply(payload)).toThrowError(
      'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create newReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'some reply',
      owner: 'user-123',
      commentId: 'comment-123',
    };

    // Action
    const { content, owner, commentId } = new NewReply(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(commentId).toEqual(payload.commentId);
  });
});
