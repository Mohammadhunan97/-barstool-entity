// this file and folder are used to test the app locally on your computer
const barstool = require('../lib/');
const { barstoolEntity } = barstool;

barstoolEntity(
  {
    host: 'localhost',
    port: 3306,
    database: 'bs',
    user: 'root',
    password: ''
  },
  false,
  true,
  true,
  false,
  false
);
