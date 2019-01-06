module.exports = {
  tables: [
    // should support boolean
    {
      tableName: 'Foods',
      columns: [
        {
          columnName: 'title',
          type: 'String'
        },
        {
          columnName: 'quantity',
          type: 'Number'
        }
      ]
    },
    {
      tableName: 'Singers',
      columns: [
        {
          columnName: 'name',
          type: 'String',
          nullable: false
          // customStatement: `title byte NOT NULL`
          // default: 'Hello'
          // regex:
          // failsRegexCustomMessage:
          // failsTypeCheckCustomMessage:
        },
        {
          columnName: 'description',
          type: 'String',
          nullable: true
        },
        {
          columnName: 'age',
          type: 'Number',
          nullable: true
          // autoIncrement: true
        }
      ]
    }
  ]
};
