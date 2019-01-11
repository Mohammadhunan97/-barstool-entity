import { mapReadAllEntitiesToSQLStatement, mapReadOneEntityToSQLStatement } from '../sqlmethods';
import mysql from 'mysql';

const readAllItemsRoute = (app, tableName, connection) => {
  app.get(`/${tableName}`, (req, res) => {
    const sqlStatement = mapReadAllEntitiesToSQLStatement(tableName);
    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);
      res.json(rows);
    });
  });
};

const readOneItemRoute = (app, tableName, connection) => {
  app.get(`/${tableName}/:id`, (req, res) => {
    const escapedId = mysql.escape(req.params.id);
    const sqlStatement = mapReadOneEntityToSQLStatement(tableName, escapedId);
    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.json({
          errorMessage: `Could not find item in ${tableName} with request id ${req.params.id}`,
          improperRequestId: Number(req.params.id)
        });
      }
    });
  });
};

export { readAllItemsRoute, readOneItemRoute };
