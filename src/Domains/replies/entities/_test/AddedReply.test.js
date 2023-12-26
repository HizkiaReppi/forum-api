import AddedReply from '../AddedReply.js';

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'some reply',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: true,
      content: 'some reply',
      owner: {},
    };

    // Action & Assert
    expect(() => new AddedReply(payload)).toThrowError('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'some reply',
      owner: 'user-123',
    };

    // Action
    const { id, content, owner } = new AddedReply(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
