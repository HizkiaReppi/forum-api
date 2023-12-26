import DetailThread from '../DetailThread.js';
import data from '../../../../../utils/data.js';

describe('a Detail Thread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      body: data.threads[0].body,
      username: data.users[0].username,
      date: data.threads[0].date,
    };

    // Action & Assert
    expect(() => new DetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specifications', () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      body: true,
      date: 2023,
      username: 234,
      comments: {},
    };

    // Action & Assert
    expect(() => new DetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATIONS',
    );
  });

  it('should get data thread object correctyly', () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      body: data.threads[0].body,
      date: data.threads[0].date,
      username: data.threads[0].username,
      comments: [],
    };

    // Action
    const { id, title, body, date, username, comments } = new DetailThread(
      payload,
    );

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toEqual(payload.comments);
    expect(Array.isArray(comments)).toBe(true);
  });
});
