const fieldFragmentMapper = (columnName, type, nullable) => {
  if (type === 'Number' && nullable) return `${columnName} INT`;

  if (type === 'Number' && !nullable) return `${columnName} INT NOT NULL`;

  if (type === 'String' && nullable) return `${columnName} VARCHAR(255)`;

  if (type === 'String' && !nullable) return `${columnName} VARCHAR(255) NOT NULL`;

  return null;
};

export default fieldFragmentMapper;
