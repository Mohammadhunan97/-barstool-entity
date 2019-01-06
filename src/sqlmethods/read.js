// loops over table and returns sql statement to return one row based on an id
const mapReadOneEntityToSQLStatement = (tableName, id) => {
  return `SELECT * FROM ${tableName} WHERE ID = ${id} LIMIT 1;`;
};

// returns sql statement to return all rows on a specific table

const mapReadAllEntitiesToSQLStatement = tableName => {
  return `SELECT * FROM ${tableName};`;
};

export { mapReadOneEntityToSQLStatement, mapReadAllEntitiesToSQLStatement };
