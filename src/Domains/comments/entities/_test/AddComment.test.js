import AddComment from '../AddComment.js';
import data from '../../../../../utils/data.js';

describe('a Add Comment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      owner: data.users[0].id,
      threadId: data.threads[0].id,
    };

    // Action & Assert
    expect(() => new AddComment(payload)).toThrowError(
      'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      content: data.comments[0].content,
      owner: {},
      threadId: 23,
    };

    // Actiond & Support
    expect(() => new AddComment(payload)).toThrowError(
      'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS',
    );
  });

  it('should create Comment object correctly', () => {
    // Arrange
    const payload = {
      content: data.comments[0].content,
      owner: data.users[0].id,
      threadId: data.threads[0].id,
    };

    // Action
    const { content, owner, threadId } = new AddComment(payload);

    // Assert
    expect(content).toStrictEqual(payload.content);
    expect(owner).toStrictEqual(payload.owner);
    expect(threadId).toStrictEqual(payload.threadId);
  });
});
