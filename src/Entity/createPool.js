import mysql from 'mysql';

const createPool = conn => {
  const { host, port, user, password, database } = conn;

  return mysql.createPool({
    host,
    port,
    user,
    password,
    database
  });
};

export default createPool;
