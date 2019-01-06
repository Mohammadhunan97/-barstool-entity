import { mapUpdateOneEntityToSQLStatement } from '../src/sqlmethods/';

const tableName = 'Pokemon';
const alterFragment = `name = 'raichu'`;
const id = 1;
const values = ['raichu'];
const keys = ['name'];
const result = `UPDATE ${tableName} SET ${alterFragment} WHERE id = ${id};`;

test('Use mapReadOneEntityToSQLStatement to create sql update one value statement', () => {
  expect(mapUpdateOneEntityToSQLStatement(tableName, values, keys, id)).toBe(result);
});
