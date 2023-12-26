import AddedThread from '../AddedThread.js';
import data from '../../../../../utils/data.js';

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
    };

    // Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 234,
      title: true,
      owner: {},
    };

    // Action & Assert
    expect(() => new AddedThread(payload)).toThrowError(
      'ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      owner: data.users[0].id,
    };

    // Action
    const { id, title, owner } = new AddedThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
