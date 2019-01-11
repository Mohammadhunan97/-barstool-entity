import { mapDeleteOneEntityToSQLStatement } from '../sqlmethods';
import mysql from 'mysql';

const deleteOneEntityRoute = (app, tableName, connection) => {
  app.delete(`/${tableName}/delete/:id`, (req, res) => {
    const escapedId = mysql.escape(req.params.id);
    const sqlStatement = mapDeleteOneEntityToSQLStatement(tableName, escapedId);
    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);
      if (rows.affectedRows > 0) {
        res.send(`${rows.affectedRows} row deleted`);
      } else {
        res.json({
          errorMessage: `Could not find any items in the database with request id ${req.params.id}`,
          invalidRequestId: req.params.id
        });
      }
    });
  });
};

export default deleteOneEntityRoute;
