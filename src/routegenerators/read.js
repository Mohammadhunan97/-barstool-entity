const readAllItemsRoute = tableName => {
  routes.push({
    entity: tableName,
    route: `/${tableName}`,
    type: 'GET',
    description: `retrieves all ${tableName}`
  });
  app.get(`/${tableName}`, (req, res) => {
    const sqlStatement = mapReadAllEntitiesToSQLStatement(tableName);
    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);
      res.json(rows);
    });
  });
};

const readOneItemRoute = tableName => {
  routes.push({
    entity: tableName,
    route: `/${tableName}/:id`,
    type: 'GET',
    description: `retrieves one ${tableName} based on request id`
  });
  app.get(`/${tableName}/:id`, (req, res) => {
    const sqlStatement = mapReadOneEntityToSQLStatement(
      tableName,
      req.params.id
    );
    connection.query(sqlStatement, (err, rows) => {
      if (err) res.send(err);
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.json({
          errorMessage: `Could not find item in ${tableName} with request id ${
            req.params.id
          }`,
          improperRequestId: Number(req.params.id)
        });
      }
    });
  });
};

export { readAllItemsRoute, readOneItemRoute };
