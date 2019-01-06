const mapDeleteOneEntityToSQLStatement = (tableName, id) => {
  return `DELETE FROM ${tableName} WHERE id = ${id};`;
};

export default mapDeleteOneEntityToSQLStatement;
