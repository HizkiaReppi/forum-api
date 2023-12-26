import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: {
    mode: process.env.NODE_ENV,
  },
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  db: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    name: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
  },
  db_test: {
    host: process.env.PGHOST_TEST,
    port: process.env.PGPORT_TEST,
    user: process.env.PGUSER_TEST,
    name: process.env.PGDATABASE_TEST,
    password: process.env.PGPASSWORD_TEST,
  },
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    accessTokenAge: process.env.ACCESS_TOKEN_AGE,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  },
};

export default config;
