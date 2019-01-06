import fieldFragmentMapper from './fieldFragmentMapper';

const createTablesMapper = entities => {
  const sqlStatements = [];

  let createTableStrings = ``;
  // replace o^2 with lighter algorithm
  entities.tables.forEach(table => {
    let fields = ``;
    table.columns.forEach((column, i) => {
      const { columnName, type, nullable } = column;
      let fragment;
      table.columns.length - 1 === i
        ? (fragment = `${fieldFragmentMapper(columnName, type, nullable)}`)
        : (fragment = `${fieldFragmentMapper(columnName, type, nullable)},`);
      fields += fragment;
    });
    const sqlCreateTableStatem = `CREATE TABLE IF NOT EXISTS ${
      table.tableName
    } (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${fields} );`;
    createTableStrings += sqlCreateTableStatem;
    sqlStatements.push(createTableStrings);
    createTableStrings = ``;
  });
  return sqlStatements;
};

export default createTablesMapper;
