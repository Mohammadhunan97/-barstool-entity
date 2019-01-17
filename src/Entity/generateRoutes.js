import {
  createOneItemRoute,
  readAllItemsRoute,
  readOneItemRoute,
  updateOneEntityRoute,
  deleteOneEntityRoute
} from '../routegenerators';

const generateRoutes = (app, connection, tables) => {
  tables.forEach(table => {
    if (table.routesNeeded) {
      table.routesNeeded.forEach(routeType => {
        switch (routeType) {
          case 'create':
            createOneItemRoute(app, table, connection);
            break;
          case 'read-one':
            readOneItemRoute(app, table.tableName, connection);
            break;
          case 'read-all':
            readAllItemsRoute(app, table.tableName, connection);
            break;
          case 'update':
            updateOneEntityRoute(app, table, connection);
            break;
          case 'delete':
            deleteOneEntityRoute(app, table.tableName, connection);
            break;
          default:
            return { errorMessage: `Could not generate route of type ${routeType}` };
        }
      });
    } else {
      createOneItemRoute(app, table, connection);
      readOneItemRoute(app, table.tableName, connection);
      readAllItemsRoute(app, table.tableName, connection);
      updateOneEntityRoute(app, table, connection);
      deleteOneEntityRoute(app, table.tableName, connection);
    }
  });
};

export default generateRoutes;
