// {
//   "development": {
//     "username": "postgres",
//     "password": null,
//     "database": "postgres",
//     "host": "127.0.0.1",
//     "dialect": "postgres",
//     "port": 5432
//   },
//   "test": {
//     "username": "postgres",
//     "password": null,
//     "database": "postgres",
//     "host": "127.0.0.1",
//     "dialect": "postgres",
//     "port": 5432
//   },
//   "production": {
//     "username": "postgres",
//     "password": null,
//     "database": "postgres",
//     "host": "127.0.0.1",
//     "dialect": "postgres",
//     "port": 5432
//   }
// }


module.exports = {
  development: {
    'username': 'postgres',
    'password': 'postgres',
    'database': 'auth',
    'host': 'db',
    'dialect': 'postgres',
    'port': 5432
  },
  test: {
    'username': process.env.AUTH_DB_USERNAME,
    'password': process.env.AUTH_DB_PASSWORD,
    'database': process.env.AUTH_DATABASE,
    'host': process.env.AUTH_DB_HOST,
    'port': process.env.AUTH_DB_PORT,
    'dialect': 'postgres'
  },
  docker: {
    'username': 'postgres',
    'password': 'postgres',
    'database': 'auth',
    'host': 'db',
    'port': 5432,
    'dialect': 'postgres'
  }
};