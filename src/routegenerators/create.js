import { mapInsertNewEntityToSQLStatement } from '../sqlmethods';

const createOneItemRoute = (app, table, connection) => {
  // routes.push({
  //   entity: table.tableName,
  //   route: `/${table.tableName}/new`,
  //   type: 'POST',
  //   description: `creates a new item in ${table.tableName} table`
  // });
  app.post(`/${table.tableName}/new`, (req, res) => {
    const values = Object.values(req.body);
    const requestKeys = Object.keys(req.body);
    const keys = table.columns.map(item => item.columnName); // barstool keys
    const missingKeys = [];

    keys.forEach(barstoolKey => {
      if (!requestKeys.includes(barstoolKey)) {
        missingKeys.push(barstoolKey);
      }
    });

    if (missingKeys.length > 0) {
      res.json({
        errorMessage: 'Missing some request values',
        missingRequestValues: missingKeys
      });
    } else {
      const sqlStatement = mapInsertNewEntityToSQLStatement(table.tableName, values, requestKeys);
      connection.query(sqlStatement, (err, rows) => {
        if (err) res.send(err);
        res.status(200).send(`Successfully inserted new item in ${table.tableName} table`);
      });
    }
  });
};

export default createOneItemRoute;
