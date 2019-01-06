// these methods return sql statements to access db directly

import mapInsertNewEntityToSQLStatement from './create';
import { mapReadOneEntityToSQLStatement, mapReadAllEntitiesToSQLStatement } from './read';
import mapUpdateOneEntityToSQLStatement from './update';
import mapDeleteOneEntityToSQLStatement from './delete';
import fieldFragmentMapper from './fieldFragmentMapper';
import createTablesMapper from './createTablesMapper';

export {
  mapInsertNewEntityToSQLStatement,
  mapReadOneEntityToSQLStatement,
  mapReadAllEntitiesToSQLStatement,
  mapUpdateOneEntityToSQLStatement,
  mapDeleteOneEntityToSQLStatement,
  fieldFragmentMapper,
  createTablesMapper
};
