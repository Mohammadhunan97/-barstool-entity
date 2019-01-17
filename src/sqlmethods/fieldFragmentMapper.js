const fieldFragmentMapper = (columnName, type, nullable, customStatement) => {
  if (customStatement) return customStatement;

  if (typeof type === 'object' && type.sqlType === 'Foreign Key') {
    return `${fieldFragmentMapper(
      columnName,
      type.dataType,
      nullable
    )},FOREIGN KEY (${columnName}) REFERENCES ${type.on}(${type.references})`;
  }

  if (type === 'Number' && nullable) return `${columnName} INT`;

  if (type === 'Number' && !nullable) return `${columnName} INT NOT NULL`;

  if (type === 'String' && nullable) return `${columnName} VARCHAR(255)`;

  if (type === 'String' && !nullable) return `${columnName} VARCHAR(255) NOT NULL`;

  if (type === 'Boolean' && nullable) return `${columnName} BOOLEAN`;

  if (type === 'Boolean' && !nullable) return `${columnName} BOOLEAN NOT NULL`;

  if (type === 'Date' && nullable) return `${columnName} DATE`;

  if (type === 'Date' && !nullable) return `${columnName} DATE NOT NULL`;

  if (type === 'Timestamp' && nullable) return `${columnName} TIMESTAMP`;

  if (type === 'Timestamp' && !nullable) return `${columnName} TIMESTAMP NOT NULL`;

  return null;
};

export default fieldFragmentMapper;
