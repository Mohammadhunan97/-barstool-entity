import { mapUpdateOneEntityToSQLStatement } from '../sqlmethods/';

const updateOneEntityRoute = (app, table, connection) => {
  routes.push({
    entity: table.tableName,
    route: `/${table.tableName}/update/:id`,
    type: 'PUT',
    description: `updates one item in ${table.tableName} based on request id`
  });
  app.put(`/${table.tableName}/update/:id`, (req, res) => {
    const requestKeys = Object.keys(req.body);
    const requestValues = Object.values(req.body);
    const barstoolKeys = table.columns.map(column => column.columnName);
    const validatedKeys = [];
    const validatedValues = [];
    const invalidRequest = [];
    requestKeys.forEach((requestKey, i) => {
      if (!barstoolKeys.includes(requestKey)) {
        invalidRequest.push({
          key: requestKey,
          value: requestValues[i]
        });
      } else {
        validatedKeys.push(requestKey);
        validatedValues.push(requestValues[i]);
      }
    });

    const sqlStatement = mapUpdateOneEntityToSQLStatement(
      table.tableName,
      validatedValues,
      validatedKeys,
      req.params.id
    );

    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);

      if (invalidRequest.length > 0 && rows.affectedRows > 0) {
        res.json({
          successfullyUpdatedRow: true,
          invalidData: invalidRequest,
          updatedDataFromValidRequest: validatedKeys
        });
      } else if (rows.affectedRows > 0) {
        res.json({
          successfullyUpdatedRow: true
        });
      }
    });
  });
};

export default updateOneEntityRoute;