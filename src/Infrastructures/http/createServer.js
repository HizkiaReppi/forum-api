import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';

import ClientError from '../../Commons/exceptions/ClientError.js';
import DomainErrorTranslator from '../../Commons/exceptions/DomainErrorTranslator.js';

import users from '../../Interfaces/http/api/users/index.js';
import authentications from '../../Interfaces/http/api/authentications/index.js';
import threads from '../../Interfaces/http/api/threads/index.js';
import comments from '../../Interfaces/http/api/comments/index.js';
import replies from '../../Interfaces/http/api/replies/index.js';

import logger from '../../../utils/logging.js';
import config from '../../../utils/config.js';

const createServer = async (container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('forum_api_jwt', 'jwt', {
    keys: config.jwt.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwt.accessTokenAge,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: threads,
      options: { container },
    },
    {
      plugin: comments,
      options: { container },
    },
    {
      plugin: replies,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        logger.error(translatedError.message);

        const newResponse = h
          .response({
            status: 'fail',
            message: translatedError.message,
          })
          .code(translatedError.statusCode);

        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h
        .response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami',
        })
        .code(500);

      if (newResponse.statusCode === 500) {
        logger.error('Terjadi kegagalan pada server');
      }

      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

export default createServer;
