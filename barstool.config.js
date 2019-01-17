module.exports = {
  tables: [
    {
      tableName: 'BasketballPlayers',
      routesNeeded: ['create', 'read-one', 'read-all', 'update', 'delete'],
      columns: [
        {
          columnName: 'username',
          type: 'String',
          customStatement: 'username VARCHAR(255) unique'
        },
        {
          columnName: 'age',
          type: 'Number',
          nullable: true
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
