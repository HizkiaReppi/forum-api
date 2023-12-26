import EncryptionHelper from '../PasswordHash.js';

describe('EncryptionHelper interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const encryptionHelper = new EncryptionHelper();

    // Action & Assert
    await expect(encryptionHelper.hash('dummy_password')).rejects.toThrowError(
      'PASSWORD_HASH.METHOD_NOT_IMPLEMENTED',
    );
    await expect(
      encryptionHelper.comparePassword('plain', 'encrypted'),
    ).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
