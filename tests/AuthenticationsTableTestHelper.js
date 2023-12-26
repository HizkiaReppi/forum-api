import pool from '../src/Infrastructures/database/postgres/pool.js';

const AuthenticationsTableTestHelper = {
  async addToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await pool.query(query);
  },

  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1=1');
  },
};

export default AuthenticationsTableTestHelper;
