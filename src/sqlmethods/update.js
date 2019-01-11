const mapUpdateOneEntityToSQLStatement = (tableName, values, keys, id) => {
  let alterFragment = ``;
  keys.forEach((key, i) => {
    keys.length - 1 === i
      ? (alterFragment += `${key} = ${values[i]}`)
      : (alterFragment += `${key} = ${values[i]},`);
  });
  return `UPDATE ${tableName} SET ${alterFragment} WHERE id = ${id};`;
};

export default mapUpdateOneEntityToSQLStatement;
