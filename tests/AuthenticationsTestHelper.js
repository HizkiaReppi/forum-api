const AutheticationTestHelper = {
  async getAccessTokenHelper(server) {
    const responsRegister = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: 'hizkia',
        password: 'hizkia123',
        fullname: 'Hizkia Reppi',
      },
    });

    const responseLogin = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username: 'hizkia',
        password: 'hizkia123',
      },
    });

    const {
      data: {
        addedUser: { id: userId },
      },
    } = JSON.parse(responsRegister.payload);

    const {
      data: { accessToken },
    } = JSON.parse(responseLogin.payload);

    return { userId, accessToken };
  },
};

export default AutheticationTestHelper;
