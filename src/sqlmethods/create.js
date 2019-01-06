// this needs to be fixed because currently keys and values have to be in order
// takes in an array of values, keys and tableName and returns an insert statement
const mapInsertNewEntityToSQLStatement = (tableName, values, keys) => {
  const valuesMapped = values.map(item => `'${item}'`);
  return `INSERT INTO ${tableName} (${keys.join()}) VALUES (${valuesMapped});`;
};

export default mapInsertNewEntityToSQLStatement;
