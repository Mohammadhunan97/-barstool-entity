import appRootPath from 'app-root-path';
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import { generateTables, generateRoutes } from './';
const barstoolPath = `${appRootPath.toString()}/barstool.config.js`;
const barstoolEntities = require(barstoolPath);

// class BarstoolEntity {
//   constructor(
//     customConnection,
//     host,
//     port,
//     username,
//     password,
//     database,
//     customApp,
//     shouldGenerateRoutes,
//     needServer,
//     customEntities,
//     customPort
//   ) {
//     /*
//         available variables in BarstoolEntity class
//         this.connection
//         this.app
//         this.entities
//     */
//     customConnection
//       ? (this.connection = customConnection)
//       : (this.connection = newMySQLConnection);

//     customEntities ? (this.entities = customEntities) : (this.entities = barstoolEntities);

//     customApp ? (this.app = customApp) : (this.app = express());

//     customPort ? (this.port = customPort) : (this.port = 7070);

//     this.generateTables(this.connection);
//     if (shouldGenerateRoutes && needServer) {
//       this.app.use(bodyParser.urlencoded({ extended: false }));
//       this.app.use(bodyParser.json());
//       this.generateRoutes(this.entities.tables);
//       this.app.listen(this.port, err => {
//         if (err) {
//           console.log(
//             `Some error occurred while attempting to listen on ${this.port}. Error:\t ${err}`
//           );
//         } else {
//           console.log(`Listening on port ${this.port}`);
//         }
//       });
//     } else if (shouldGenerateRoutes && !needServer) {
//       this.generateRoutes(this.entities.tables);
//     }
//   }
// }

const mysqlCreateConnection = (host, port, user, password, database) => {
  return mysql.createConnection({
    host,
    port,
    user,
    password,
    database
  });
};

const barstoolEntity = (
  customConnection,
  host,
  customSqlPort,
  username,
  password,
  database,
  customApp,
  shouldGenerateRoutes,
  needServer,
  customEntities,
  customServerPort
) => {
  let connection, entities, app, port;

  customConnection
    ? (connection = customConnection)
    : (connection = mysqlCreateConnection(host, customSqlPort, username, password, database));

  customEntities ? (entities = customEntities) : (entities = barstoolEntities);

  customApp ? (app = customApp) : (app = express());

  customServerPort ? (port = customServerPort) : (port = 7070);

  const tablesResult = generateTables(entities, connection);

  if (shouldGenerateRoutes && needServer) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    const generatedRoutes = generateRoutes(app, connection, entities.tables);
    app.listen(port, err => {
      if (err) return `Error creating server: ${err}`;
    });
  } else if (shouldGenerateRoutes && !needServer) {
    const generatedRoutes = generateRoutes(app, connection, entities.tables);
  }
};

export default barstoolEntity;
