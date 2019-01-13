import { mapUpdateOneEntityToSQLStatement } from '../sqlmethods';
import { matchTypesToConfig } from '../Entity/';
import { matchRegexToConfig } from '../matchers/';
import mysql from 'mysql';

const updateOneEntityRoute = (app, table, connection) => {
  app.put(`/${table.tableName}/update/:id`, (req, res) => {
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
    if (isNaN(Number(req.params.id))) {
      const errorResponse = {
        errorMessage: `request id ${req.params.id} is not a number`,
        invalidRequestId: req.params.id
      };
      res.json(errorResponse);
      return errorResponse;
    }

    const requestKeys = Object.keys(req.body);
    const requestValues = Object.values(req.body);
    const barstoolKeys = table.columns.map(column => column.columnName);
    const barstoolTypes = table.columns.map(column => column.type);
    const barstoolRegex = table.columns.map(column => column.regex || null);
    const validatedKeys = [];
    const validatedValues = [];
    const invalidRequest = [];
    requestKeys.forEach((requestKey, i) => {
      if (!barstoolKeys.includes(requestKey)) {
        invalidRequest.push({
          key: requestKey,
          value: requestValues[i]
        });
      } else {
        const matchedIndex = barstoolKeys.indexOf(requestKey);
        if (
          !matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          !matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = [
            {
              key: requestKey,
              errorMessage: `Incorrect type given, ${
                barstoolTypes[matchedIndex]
              } needed but ${typeof requestValues[i]} given`
            },
            {
              key: requestKey,
              errorMessage: `Incorrect value given, value ${
                requestValues[i]
              } must match regex statement: ${barstoolRegex[matchedIndex]}`
            }
          ];
          invalidRequest.push(error);
        } else if (
          !matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = {
            key: requestKey,
            errorMessage: `Incorrect type given, ${
              barstoolTypes[matchedIndex]
            } needed but ${typeof requestValues[i]} given`
          };
          invalidRequest.push(error);
        } else if (
          matchTypesToConfig(typeof requestValues[i], barstoolTypes[matchedIndex]) &&
          !matchRegexToConfig(barstoolRegex[matchedIndex], requestValues[i])
        ) {
          let error = {
            key: requestKey,
            errorMessage: `Incorrect value given, value ${
              requestValues[i]
            } must match regex statement: ${barstoolRegex[matchedIndex]}`
          };
          invalidRequest.push(error);
        } else {
          // if it is the correct type as well
          validatedKeys.push(requestKey); // we don't have to escape this because it is matched to the barstool keys which we know are not malicious
          validatedValues.push(mysql.escape(requestValues[i])); // we have to escape this because it is a value that is from the client and we don't have anything to match it to
        }
      }
    });

    if (validatedKeys.length > 0) {
      // if there is something valid to update
      const sqlStatement = mapUpdateOneEntityToSQLStatement(
        table.tableName,
        validatedValues,
        validatedKeys,
        req.params.id
      );

      connection.query(sqlStatement, (err, rows) => {
        if (err) res.send(err);
        if (invalidRequest.length > 0 && rows.affectedRows > 0) {
          res.json({
            successfullyUpdatedRow: true,
            invalidData: invalidRequest,
            updatedDataFromValidRequest: validatedKeys
          });
        } else if (rows.affectedRows > 0) {
          res.json({
            successfullyUpdatedRow: true
          });
        } else if (rows.affectedRows === 0) {
          res.json({
            successfullyUpdatedRow: false,
            errorMessage: `Invalid request ID: ${req.params.id}`,
            invalidRequestId: req.params.id
          });
        }
      });
    } else {
      res.json({
        errorMessage: 'No valid request data to update',
        invalidData: invalidRequest
      });
    }
  });
};

export default updateOneEntityRoute;
