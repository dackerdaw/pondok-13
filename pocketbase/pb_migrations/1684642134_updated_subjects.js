migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6u9oekluvsh4jj9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_2A4SQ4v` ON `subjects` (`index`)"
  ]

  // remove
  collection.schema.removeField("w5nilojd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6u9oekluvsh4jj9")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_w3kcsEK` ON `subjects` (`slug`)",
    "CREATE UNIQUE INDEX `idx_2A4SQ4v` ON `subjects` (`index`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w5nilojd",
    "name": "slug",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
