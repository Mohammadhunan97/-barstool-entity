module.exports = {
  tables: [
    {
      tableName: 'TennisPlayers',
      columns: [
        {
          columnName: 'name',
          type: 'String'
        },
        {
          columnName: 'age',
          type: 'Number'
        },
        {
          columnName: 'phoneNumber',
          type: 'String',
          regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
        }
      ]
    }
  ]
};
