// this file and folder are used to test the app locally on your computer
// const appRootPath = require('app-root-path');
const barstool = require('../lib/');

const { BarstoolEntity } = barstool;

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
