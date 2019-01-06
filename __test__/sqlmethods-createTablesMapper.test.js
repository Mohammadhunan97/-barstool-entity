import { createTablesMapper } from '../src/sqlmethods/';

const entities = {
  tables: [
    // should support boolean
    {
      tableName: 'Pokemon',
      columns: [
        {
          columnName: 'name',
          type: 'String',
          nullable: true
        }
      ]
    }
  ]
};

const results = [];

const resultone =
  'CREATE TABLE IF NOT EXISTS Pokemon (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));';
results.push(resultone);

test('Use createTablesMapper to create sql create table statement', () => {
  expect(createTablesMapper(entities)).toEqual(results);
});
