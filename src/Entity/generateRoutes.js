import {
  createOneItemRoute,
  readAllItemsRoute,
  readOneItemRoute,
  updateOneEntityRoute,
  deleteOneEntityRoute
} from '../routegenerators';

const generateRoutes = (app, connection, tables) => {
  tables.forEach(table => {
    createOneItemRoute(app, table, connection);
    readOneItemRoute(app, table.tableName, connection);
    readAllItemsRoute(app, table.tableName, connection);
    updateOneEntityRoute(app, table, connection);
    deleteOneEntityRoute(app, table.tableName, connection);
  });
};

export default generateRoutes;
