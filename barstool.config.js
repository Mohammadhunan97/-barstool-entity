module.exports = {
  tables: [
    // {
    //   tableName: 'BasketballPlayers',
    //   routesNeeded: ['create', 'read-one', 'read-all', 'update', 'delete'],
    //   columns: [
    //     {
    //       columnName: 'username',
    //       type: 'String',
    //       customStatement: 'username VARCHAR(255) unique'
    //     },
    //     {
    //       columnName: 'age',
    //       type: 'Number',
    //       nullable: true
    //     },
    //     {
    //       columnName: 'phoneNumber',
    //       type: 'String',
    //       regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    //     }
    //   ]
    // }
    {
      tableName: 'users',
      columns: [
        {
          columnName: 'username',
          type: 'String'
        },
        {
          columnName: 'password',
          type: 'String'
        }
      ]
    },
    {
      tableName: 'posts',
      columns: [
        {
          columnName: 'user_id',
          type: {
            sqlType: 'Foreign Key',
            dataType: 'Number',
            references: 'id',
            on: 'users'
          }
        },
        // {
        //   columnName: 'user_id',
        //   type: 'Number'
        // },
        // {
        //   columnName: 'foreignKeyForUserId',
        //   type: 'Number',
        //   customStatement: 'FOREIGN KEY (user_id) REFERENCES users(id)'
        // },
        // {
        //   columnName: 'foreignKeyForUserId',
        //   customStatement: 'user_id int, FOREIGN KEY (user_id) REFERENCES users(id)'
        // },
        {
          columnName: 'description',
          type: 'String'
        }
      ]
    }
  ]
};
