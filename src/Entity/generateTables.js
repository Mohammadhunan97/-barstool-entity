import { createTablesMapper } from '../sqlmethods';

const generateTables = (entities, connection) => {
  const sqlStatements = createTablesMapper(entities);
  sqlStatements.forEach(statement => {
    connection.query(statement, (err, rows) => {
      if (err) return err;
      return rows;
    });
  });
};
export default generateTables;
