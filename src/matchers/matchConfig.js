const matchConfig = config => {
  // takes in a config object and returns { matched: true} if it is written properly and error message if written improperly
  let hasTablesArray;
  let columnsIsArray = true; // true until proven false
  let typesAreCorrect = true; // true until proven false
  let regexpsAreCorrect = true; // true until proven false
  let properTypes = ['String', 'Number', 'Boolean', 'Date', 'Timestamp'];

  Array.isArray(config.tables) ? (hasTablesArray = true) : (hasTablesArray = false);

  config.tables.forEach(table => {
    if (!Array.isArray(table.columns)) {
      columnsIsArray = false;
    }
  });

  const types = [];
  const regexps = [];

  config.tables.forEach((table, x) => {
    table.columns.forEach((column, i) => {
      //   console.log(`table ${x} column ${i}`);
      types.push(column.type);
      if (column.regex) {
        regexps.push(column.regex);
      }
    });
  });

  types.forEach(type => {
    if (!properTypes.includes(type)) {
      typesAreCorrect = false;
    }
  });

  regexps.forEach(regexp => {
    if (regexp instanceof RegExp === false) {
      regexpsAreCorrect = false;
    }
  });

  const errors = [];

  if (!hasTablesArray) {
    errors.push({
      errorMessage: 'Config object or file must have a "tables" key of type Array'
    });
  }

  if (!columnsIsArray) {
    errors.push({
      errorMessage: 'Config table columns must all be of type Array'
    });
  }

  if (!typesAreCorrect) {
    errors.push({
      errorMessage: `Column types must be of the following type: ${properTypes}`,
      typesGiven: JSON.stringify(types)
    });
  }

  if (!regexpsAreCorrect) {
    errors.push({
      errorMessage: 'improper value for RegExp given in config'
    });
  }

  if (errors.length > 0) {
    return {
      matched: false,
      errors
    };
  } else {
    return { matched: true };
  }
};

export default matchConfig;
