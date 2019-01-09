import { mapInsertNewEntityToSQLStatement } from '../sqlmethods';

const createOneItemRoute = (app, table, connection) => {
  // routes.push({
  //   entity: table.tableName,
  //   route: `/${table.tableName}/new`,
  //   type: 'POST',
  //   description: `creates a new item in ${table.tableName} table`
  // });
  app.post(`/${table.tableName}/new`, (req, res) => {
    const requestValues = Object.values(req.body);
    const requestKeys = Object.keys(req.body);
    const keys = table.columns.map(item => item.columnName); // barstool keys
    const missingKeys = [];
    const extraKeys = [];
    const validKeys = [];
    const validValues = [];

    keys.forEach(barstoolKey => {
      if (!requestKeys.includes(barstoolKey)) {
        missingKeys.push(barstoolKey);
      }
    });

    requestKeys.forEach((reqKey, i) => {
      if (keys.includes(reqKey)) {
        // if the request key is infact a key we need, we will need to put that key and its value in the respective 'validKeys' and 'validValues' arrays.
        validValues.push(requestValues[i]);
        validKeys.push(reqKey);
      } else {
        extraKeys.push(reqKey);
      }
    });

    if (missingKeys.length > 0) {
      res.json({
        errorMessage: 'Missing some request values',
        missingRequestValues: missingKeys
      });
    } else {
      const sqlStatement = mapInsertNewEntityToSQLStatement(
        table.tableName,
        validValues,
        validKeys
      );
      connection.query(sqlStatement, (err, rows) => {
        if (err) res.send(err);
        if (extraKeys.length > 0) {
          res.json({
            successFullyInsertedItem: true,
            invalidData: extraKeys,
            insertedDataFromValidRequest: validKeys,
            message: `Successfully inserted new item in ${table.tableName} table`
          });
        } else {
          res.json({
            successFullyInsertedItem: true,
            message: `Successfully inserted new item in ${table.tableName} table`
          });
        }
      });
    }
  });
};

export default createOneItemRoute;
