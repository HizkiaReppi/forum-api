import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';
import config from '../../../utils/config.js';

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.generate(payload, config.jwt.accessTokenKey);
  }

  async createRefreshToken(payload) {
    return this._jwt.generate(payload, config.jwt.refreshTokenKey);
  }

  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, config.jwt.refreshTokenKey);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

export default JwtTokenManager;
