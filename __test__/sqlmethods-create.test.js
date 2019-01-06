import { mapInsertNewEntityToSQLStatement } from '../src/sqlmethods/';

const tableName = 'Pokemon';
const values = ['pikachu', 100];
const keys = ['name', 'powerlevel'];
const valuesMapped = values.map(item => `'${item}'`);
const result = `INSERT INTO ${tableName} (${keys.join()}) VALUES (${valuesMapped});`;

test('Use mapInsertNewEntityToSQLStatement to create sql insert statement', () => {
  expect(mapInsertNewEntityToSQLStatement(tableName, values, keys)).toBe(result);
});
