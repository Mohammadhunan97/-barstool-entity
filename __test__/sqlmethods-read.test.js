import {
  mapReadOneEntityToSQLStatement,
  mapReadAllEntitiesToSQLStatement
} from '../src/sqlmethods/';

const tableName = 'Pokemon';
const id = 1;
const readOneResult = `SELECT * FROM ${tableName} WHERE ID = ${id} LIMIT 1;`;
const readAllResults = `SELECT * FROM ${tableName};`;

test('Use mapReadOneEntityToSQLStatement to create sql read one value statement', () => {
  expect(mapReadOneEntityToSQLStatement(tableName, id)).toBe(readOneResult);
});

test('Use mapReadAllEntitiesToSQLStatement to create sql read all values statement', () => {
  expect(mapReadAllEntitiesToSQLStatement(tableName)).toBe(readAllResults);
});
