import AddThreadUseCase from '../AddThreadUseCase.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import AddThread from '../../../Domains/threads/entities/AddThread.js';
import AddedThread from '../../../Domains/threads/entities/AddedThread.js';
import data from '../../../../utils/data.js';

describe('AddThreadUseCase', () => {
  it('should orchestrating add thread function correctly', async () => {
    // Arrange
    const payload = {
      id: data.threads[0].id,
      title: data.threads[0].title,
      body: data.threads[0].body,
    };

    const owner = data.users[0].id;

    const expectedAddedThread = new AddedThread({
      id: payload.id,
      title: payload.title,
      owner,
    });

    // creating depedency of use case
    const mockThreadRepository = new ThreadRepository();

    // mocking needed function
    mockThreadRepository.addThread = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedThread({
          id: payload.id,
          title: payload.title,
          owner,
        }),
      ),
    );

    // create use case instance
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(payload, owner);

    // Assert
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread({
        title: payload.title,
        body: payload.body,
        owner,
      }),
    );
    expect(addedThread).toStrictEqual(expectedAddedThread);
  });
});
