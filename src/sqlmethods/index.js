// these methods return sql statements to access db directly

import mapInsertNewEntityToSQLStatement from './create';
import {
  mapReadOneEntityToSQLStatement,
  mapReadAllEntitiesToSQLStatement
} from './read';
import mapUpdateOneEntityToSQLStatement from './update';
import mapDeleteOneEntityToSQLStatement from './delete';

export {
  mapInsertNewEntityToSQLStatement,
  mapReadOneEntityToSQLStatement,
  mapReadAllEntitiesToSQLStatement,
  mapUpdateOneEntityToSQLStatement,
  mapDeleteOneEntityToSQLStatement
};
