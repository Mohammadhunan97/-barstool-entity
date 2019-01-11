import express from 'express';
import bodyParser from 'body-parser';
import { generateTables, generateRoutes, retrieveEntitiesFromConfig, createPool } from './';

class BarstoolEntity {
  // methods in barstoolEnt should only be created if they are used in the client, not within methods
  constructor(conn, customApp, customPort, customEntities) {
    conn.host ? (this.pool = createPool(conn)) : (this.pool = conn);
    customApp ? (this.app = customApp) : (this.app = express());
    customPort ? (this.port = customPort) : (this.port = 7070);
    if (customEntities) {
      this.entities = customEntities;
    } else {
      const retrievedEntities = retrieveEntitiesFromConfig();
      retrievedEntities.err ? retrievedEntities.errorMessage : (this.entities = retrievedEntities);
    }
  }
  createServerAndRoutes() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    const generatedRoutes = this.createRoutes(this.app, this.entities.tables);
    this.app.listen(this.port, err => {
      if (err) return `Error creating server: ${err}`;
      return {
        msg: 'listening on' + this.port,
        generatedRoutes
      };
    });
  }
  createRoutes(app, tables) {
    this.pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      generateRoutes(app, connection, tables);
    });
  }
}

export default BarstoolEntity;
