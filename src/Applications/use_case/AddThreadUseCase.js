import AddThread from '../../Domains/threads/entities/AddThread.js';

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(payload, owner) {
    const addThread = new AddThread({ ...payload, owner });
    return this._threadRepository.addThread(addThread);
  }
}

export default AddThreadUseCase;
