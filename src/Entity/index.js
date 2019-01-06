// import appRootPath from 'app-root-path';
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import {
  createOneItemRoute,
  readAllItemsRoute,
  readOneItemRoute,
  updateOneEntityRoute,
  deleteOneEntityRoute
} from '../routegenerators';
import { createTablesMapper } from '../sqlmethods';

class BarstoolEntity {
  constructor(
    customConnection,
    host,
    port,
    username,
    password,
    database,
    customApp,
    shouldGenerateRoutes,
    needServer,
    customEntities,
    customPort
  ) {
    /*
        available variables in BarstoolEntity class
        this.connection
        this.app
        this.entities
    */
    if (customConnection) {
      this.connection = customConnection;
    } else {
      this.connection = mysql.createConnection({
        host,
        port,
        user: username,
        password,
        database
      });
    }
    if (customEntities) {
      this.entities = customEntities;
    } else {
      // this.entities = `${appRootPath.toString}/barstool.config.js`;
      this.entities = `${process.cwd()}/barstool.config.js`;
    }
    if (customApp) {
      this.app = customApp;
    } else {
      this.app = express();
    }
    if (customPort) {
      this.port = customPort;
    } else {
      this.port = 7070;
    }
    this.generateTables(this.connection);
    if (shouldGenerateRoutes && needServer) {
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(bodyParser.json());
      this.generateRoutes(this.entities.tables);
      this.app.listen(this.port, err => {
        if (err) {
          console.log(
            `Some error occurred while attempting to listen on ${this.port}. Error:\t ${err}`
          );
        } else {
          console.log(`Listening on port ${this.port}`);
        }
      });
    } else if (shouldGenerateRoutes && !needServer) {
      this.generateRoutes(this.entities.tables);
    }
  }

  generateTables(connection) {
    const sqlStatements = createTablesMapper(this.entities);
    sqlStatements.forEach(statement => {
      connection.query(statement, (err, rows) => {
        if (err) console.log(err);
        this.createTableRows = rows;
      });
    });
  }

  generateRoutes(tables) {
    tables.forEach(table => {
      createOneItemRoute(this.app, table);
      readOneItemRoute(this.app, table.tableName);
      readAllItemsRoute(this.app, table.tableName);
      updateOneEntityRoute(this.app, table);
      deleteOneEntityRoute(this.app, table.tableName);
    });
  }
}

export default BarstoolEntity;
