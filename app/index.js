// this file and folder are used to test the app locally on your computer
const barstool = require('../lib/');
const given = require('../barstool.config');

const { BarstoolEntity } = barstool;

const localDB = {
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'barstooliandemolocal'
};
const db = localDB;
// customConnection,
// host,
// port,
// username,
// password,
// database,
// customApp,
// shouldGenerateRoutes,
// needServer,
// customEntities,
// customPort
const bE1 = new BarstoolEntity(
  null,
  db.host,
  db.port,
  db.username,
  db.password,
  db.database,
  null,
  true,
  true,
  given,
  null
);

console.log('bsEntities', bE1.getEntities());
