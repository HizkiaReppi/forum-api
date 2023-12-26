import autoBind from 'auto-bind';
import LoginUserUseCase from '../../../../Applications/use_case/LoginUserUseCase.js';
import RefreshAuthenticationUseCase from '../../../../Applications/use_case/RefreshAuthenticationUseCase.js';
import LogoutUserUseCase from '../../../../Applications/use_case/LogoutUserUseCase.js';
import logger from '../../../../../utils/logging.js';

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(
      request.payload,
    );

    logger.info('POST /authentications');
    logger.info(`User ${request.payload.username} logged in`);

    const response = h
      .response({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      })
      .code(201);

    return response;
  }

  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name,
    );
    const accessToken = await refreshAuthenticationUseCase.execute(
      request.payload,
    );

    logger.info('PUT /authentications');

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const logoutUserUseCase = this._container.getInstance(
      LogoutUserUseCase.name,
    );

    await logoutUserUseCase.execute(request.payload);

    logger.info('DELETE /authentications');

    return {
      status: 'success',
    };
  }
}

export default AuthenticationsHandler;
