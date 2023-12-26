import DetailComment from '../DetailComment.js';
import data from '../../../../../utils/data.js';

describe('a DetailComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      id: data.comments[0].id,
      date: data.comments[0].date,
      content: data.comments[0].content,
    };

    // Action & Assert
    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 234,
      date: 2023,
      content: [],
      isDeleted: 'yes',
    };

    // Action & Assert
    expect(() => new DetailComment(payload)).toThrowError(
      'DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS',
    );
  });

  it('should create data comment object correctyly', () => {
    // Arrange
    const payload = {
      id: data.comments[0].id,
      username: data.comments[0].username,
      date: data.comments[0].date,
      content: data.comments[0].content,
      isDeleted: data.comments[0].is_deleted,
    };

    // Action
    const { id, username, date, content } = new DetailComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual(payload.content);
  });
});
