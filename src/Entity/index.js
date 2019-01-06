import appRootPath from 'app-root-path';
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import {
  createOneItemRoute,
  readAllItemsRoute,
  readOneItemRoute,
  updateOneEntityRoute,
  deleteOneEntityRoute
} from '../routegenerators/';

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
        host: host,
        port: port,
        user: username,
        password: password,
        database: database
      });
    }
    if (customEntities) {
      this.entities = customEntities;
    } else {
      this.entities = appRootPath.toString + '/barstool.config.js';
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
            `Some error occurred while attempting to listen on ${
              this.port
            }. Error:\t ${err}`
          );
        } else {
          console.log(`Listening on port ${this.port}`);
        }
      });
    } else if (shouldGenerateRoutes && !needServer) {
      this.generateRoutes(this.entities.tables);
    }
  }
  fieldFragmentMapper(columnName, type, nullable) {
    if (type === 'Number' && nullable) return `${columnName} INT`;

    if (type === 'Number' && !nullable) return `${columnName} INT NOT NULL`;

    if (type === 'String' && nullable) return `${columnName} VARCHAR(255)`;

    if (type === 'String' && !nullable)
      return `${columnName} VARCHAR(255) NOT NULL`;
  }
  mapBarstoolTablesToSQLStatement() {
    const sqlStatements = [];

    let createTableStrings = ``;
    // replace o^2 with lighter algorithm
    entities.tables.forEach(table => {
      let fields = ``;
      table.columns.forEach((column, i) => {
        const { columnName, type, nullable } = column;
        let fragment;
        table.columns.length - 1 === i
          ? (fragment = `${this.fieldFragmentMapper(
              columnName,
              type,
              nullable
            )}`)
          : (fragment = `${this.fieldFragmentMapper(
              columnName,
              type,
              nullable
            )},`);
        fields += fragment;
      });
      const sqlCreateTableStatem = `CREATE TABLE IF NOT EXISTS ${
        table.tableName
      } (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ${fields} );`;
      createTableStrings += sqlCreateTableStatem;
      sqlStatements.push(createTableStrings);
      createTableStrings = ``;
    });
    return sqlStatements;
  }
  generateTables(connection) {
    const sqlStatements = this.mapBarstoolTablesToSQLStatement();
    sqlStatements.forEach(statement => {
      connection.query(statement, (err, rows) => {
        console.log({
          err,
          rows
        });
      });
    });
  }
  generateRoutes = tables => {
    tables.forEach(table => {
      createOneItemRoute(this.app, table);
      readOneItemRoute(this.app, table.tableName);
      readAllItemsRoute(this.app, table.tableName);
      updateOneEntityRoute(this.app, table);
      deleteOneEntityRoute(this.app, table.tableName);
    });
  };
}

export default BarstoolEntity;
