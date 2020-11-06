import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'activities',
      columns: [
        { name: 'title',       type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'number',      type: 'number', isIndexed: true },
        { name: 'made_at',     type: 'string', isIndexed: true },
        { name: 'created_at',  type: 'string', isIndexed: true },
        { name: 'updated_at',  type: 'string', isIndexed: true },
      ]
    }),
    tableSchema({
      name: 'tags',
      columns: [
        { name: 'label',       type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'unit',        type: 'string', isOptional: true },
        { name: 'created_at',  type: 'string', isIndexed: true },
        { name: 'updated_at',  type: 'string', isIndexed: true },
      ]
    }),
    tableSchema({
      name: 'activity_tags',
      columns: [
        { name: 'activity_id', type: 'string', isIndexed: true },
        { name: 'tag_id',      type: 'string', isIndexed: true },
        { name: 'rank',        type: 'number', isIndexed: true },
        { name: 'created_at',  type: 'string', isIndexed: true },
        { name: 'updated_at',  type: 'string', isIndexed: true },
      ]
    })
  ]
})
