import appRootPath from 'app-root-path';
import mysql from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import { generateTables, generateRoutes } from './';

const barstoolPath = `${appRootPath.toString()}/barstool.config.js`;

const mysqlCreateConnection = conn => {
  const { host, port, user, password, database } = conn;

  return mysql.createConnection({
    host,
    port,
    user,
    password,
    database
  });
};

const barstoolEntity = (
  conn,
  customApp,
  shouldGenerateRoutes,
  shouldCreateServer,
  customEntities,
  customServerPort
) => {
  let connection, app, entities, port;
  if (customEntities) {
    entities = customEntities;
  } else {
    try {
      const barstoolEntities = require(barstoolPath);
      entities = barstoolEntities;
    } catch (err) {
      return `No Barstool Entity and no custom entity given in path ${barstoolPath}`;
    }
  }
  conn.host ? (connection = mysqlCreateConnection(conn)) : (connection = conn);
  customApp ? (app = customApp) : (app = express());
  customServerPort ? (port = customServerPort) : (port = 7070);
  generateTables(entities, connection);

  if (shouldGenerateRoutes && shouldCreateServer) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    const generatedRoutes = generateRoutes(app, connection, entities.tables);
    app.listen(port, err => {
      if (err) return `Error creating server: ${err}`;
      return generatedRoutes;
    });
  } else if (shouldGenerateRoutes && !needServer) {
    const generatedRoutes = generateRoutes(app, connection, entities.tables);
    return generatedRoutes;
  }
};

export default barstoolEntity;
