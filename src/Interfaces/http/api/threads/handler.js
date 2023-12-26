import autoBind from 'auto-bind';
import logger from '../../../../../utils/logging.js';
import AddThreadUseCase from '../../../../Applications/use_case/AddThreadUseCase.js';
import GetThreadUseCase from '../../../../Applications/use_case/GetThreadUseCase.js';

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAddThreadHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, owner);

    logger.info('POST /threads');
    logger.info(`Thread ${addedThread.title} added`);

    const response = h
      .response({
        status: 'success',
        data: {
          addedThread,
        },
      })
      .code(201);

    return response;
  }

  async getThreadHandler(request) {
    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const thread = await getThreadUseCase.execute(request.params);

    logger.info(`GET /threads/${request.params.threadId}`);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }
}

export default ThreadsHandler;
