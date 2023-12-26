import InvariantError from './InvariantError.js';

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai',
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit',
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang',
  ),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'harus mengirimkan username dan password',
  ),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'username dan password harus string',
  ),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
  ),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat thread baru karena tipe data tidak sesuai',
  ),
  'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATIONS': new InvariantError(
    'tidak dapat membuat comment baru karena tipe data tidak sesuai',
  ),
  'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat balasan comment baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat balasan comment baru karena tipe data tidak sesuai',
  ),
};

export default DomainErrorTranslator;
