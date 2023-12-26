import autoBind from 'auto-bind';
import logger from '../../../../../utils/logging.js';
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase.js';

class UsersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    logger.info('POST /users');
    logger.info(`User ${addedUser.username} registered`);

    const response = h
      .response({
        status: 'success',
        data: {
          addedUser,
        },
      })
      .code(201);
    return response;
  }
}

export default UsersHandler;
