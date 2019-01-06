import { fieldFragmentMapper } from '../src/sqlmethods/';

const columnName = 'powerlevel';
const type = 'Number';
const nullable = false;
const customStatement = false;
const result = `${columnName} INT NOT NULL`;

test('Use fieldFragmentMapper to create sql column statement to be used inside create table statement', () => {
  expect(fieldFragmentMapper(columnName, type, nullable, customStatement)).toEqual(result);
});
