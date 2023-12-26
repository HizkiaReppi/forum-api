import AddThread from '../AddThread.js';
import data from '../../../../../utils/data.js';

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: data.threads[0].title,
    };

    // Action & Assert
    expect(() => new AddThread(payload)).toThrowError(
      'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: data.threads[0].title,
      body: true,
      owner: {},
    };

    // Action & Assert
    expect(() => new AddThread(payload)).toThrowError(
      'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AddThread object correctly', () => {
    // Arrange
    const payload = {
      title: data.threads[0].title,
      body: data.threads[0].body,
      owner: data.users[0].id,
    };

    // Action
    const { title, body, owner } = new AddThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
