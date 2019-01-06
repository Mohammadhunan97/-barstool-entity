import { mapDeleteOneEntityToSQLStatement } from '../src/sqlmethods/';

const tableName = 'Pokemon';
const id = 1;
const result = `DELETE FROM ${tableName} WHERE id = ${id};`;

test('Use mapReadOneEntityToSQLStatement to create sql update one value statement', () => {
  expect(mapDeleteOneEntityToSQLStatement(tableName, id)).toBe(result);
});
