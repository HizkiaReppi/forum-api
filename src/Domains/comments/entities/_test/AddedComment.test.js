import AddedComment from '../AddedComment.js';
import data from '../../../../../utils/data.js';

describe('a Added Comment entities', () => {
  it('should throw erorr when payload not contain needed property', () => {
    // Arrange
    const payload = {
      id: data.comments[0].id,
      content: data.comments[0].content,
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      content: true,
      owner: {},
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrowError(
      'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS',
    );
  });

  it('should create addedComment object correctly', () => {
    // Arrange
    const payload = {
      id: data.comments[0].id,
      content: data.comments[0].content,
      owner: data.users[0].id,
    };

    // Action
    const { id, content, owner } = new AddedComment(payload);

    // Assert
    expect(id).toStrictEqual(payload.id);
    expect(content).toStrictEqual(payload.content);
    expect(owner).toStrictEqual(payload.owner);
  });
});
