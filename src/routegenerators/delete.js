import { mapDeleteOneEntityToSQLStatement } from '../sqlmethods';

const deleteOneEntityRoute = (app, tableName, connection) => {
  app.delete(`/${tableName}/delete/:id`, (req, res) => {
    const sqlStatement = mapDeleteOneEntityToSQLStatement(tableName, req.params.id);
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
