// this file and folder are used to test the app locally on your computer
const barstool = require('../lib/');
const { barstoolEntity } = barstool;
const mysql = require('mysql');

const conn = {
  host: 'localhost',
  port: 3306,
  database: 'bs',
  user: 'root',
  password: ''
};
const bEnt = new barstoolEntity(conn, null, null, null);
bEnt.createServerAndRoutes();
