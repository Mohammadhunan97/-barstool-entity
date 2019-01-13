import { mapInsertNewEntityToSQLStatement } from '../sqlmethods';
import { matchTypesToConfig } from '../Entity/';
import { matchRegexToConfig } from '../matchers/';
import mysql from 'mysql';

const createOneItemRoute = (app, table, connection) => {
  app.post(`/${table.tableName}/new`, (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.json({
        errorMessage: 'Improper request body, check if you are submitting application/json',
        invalidRequestBody: req.body
      });
      return {
        errorMessage: 'Improper request body, check if you are submitting application/json',
        invalidRequestBody: req.body
      };
    }
    const requestValues = Object.values(req.body);
    const requestKeys = Object.keys(req.body);
    const keys = table.columns.map(item => item.columnName); // barstool keys
    const barstoolTypes = table.columns.map(column => column.type);
    const barstoolRegex = table.columns.map(column => column.regex || null);
    const missingKeys = [];
    const extraKeys = [];
    const validKeys = [];
    const validValues = [];

    keys.forEach(barstoolKey => {
      if (!requestKeys.includes(barstoolKey)) {
        missingKeys.push(barstoolKey);
      }
    });

    requestKeys.forEach((reqKey, i) => {
      if (keys.includes(reqKey)) {
        const matchedIndex = keys.indexOf(reqKey);
        // if the request key is infact a key we need, we will need to put that key and its value in the respective 'validKeys' and 'validValues' arrays.
        if (
          !matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          !matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = [
            {
              key: reqKey,
              errorMessage: `Incorrect type given, ${
                barstoolTypes[matchedIndex]
              } needed but ${typeof requestValues[i]} given`
            },
            {
              key: reqKey,
              errorMessage: `Incorrect value given, value ${
                requestValues[i]
              } must match regex statement: ${barstoolRegex[matchedIndex]}`
            }
          ];
          missingKeys.push(error);
        } else if (
          !matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = {
            key: reqKey,
            errorMessage: `Incorrect type given, ${
              barstoolTypes[matchedIndex]
            } needed but ${typeof requestValues[i]} given`
          };
          missingKeys.push(error);
        } else if (
          matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          !matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = {
            key: reqKey,
            errorMessage: `Incorrect value given, value ${
              requestValues[i]
            } must match regex statement: ${barstoolRegex[matchedIndex]}`
          };
          missingKeys.push(error);
        } else {
          validValues.push(mysql.escape(requestValues[i])); // we have to escape this because it is a value that is from the client and we don't have anything to match it to
          validKeys.push(reqKey); // we don't have to escape this because it is matched to the barstool keys which we know are not malicious
        }
      } else {
        extraKeys.push(reqKey);
      }
    });

    if (missingKeys.length > 0) {
      res.json({
        errorMessage: 'Missing some request values',
        missingRequestValues: missingKeys
      });
    } else {
      const sqlStatement = mapInsertNewEntityToSQLStatement(
        table.tableName,
        validValues,
        validKeys
      );

      connection.query(sqlStatement, (err, rows) => {
        if (err) res.send(err);
        if (extraKeys.length > 0) {
          res.json({
            successFullyInsertedItem: true,
            invalidData: extraKeys,
            insertedDataFromValidRequest: validKeys,
            message: `Successfully inserted new item in ${table.tableName} table`
          });
        } else {
          res.json({
            successFullyInsertedItem: true,
            message: `Successfully inserted new item in ${table.tableName} table`
          });
        }
      });
    }
  });
};

export default createOneItemRoute;
