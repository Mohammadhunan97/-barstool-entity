// this file and folder are used to test the app locally on your computer
// const appRootPath = require('app-root-path');
const barstool = require('../lib/');

// const path = `${process.cwd()}/barstool.config`;
// const given = require(path);

const { BarstoolEntity } = barstool;

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
  'localhost',
  3306,
  'root',
  '',
  'barstooliandemolocal',
  null,
  true,
  true,
  null,
  null
);
