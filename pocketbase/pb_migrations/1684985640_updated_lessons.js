migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ava164gr3k134dk")

  collection.indexes = [
    "CREATE INDEX `idx_sSgiBj6` ON `lessons` (`page_id`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2zuwxnns",
    "name": "page_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "awusgobwenumftw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ava164gr3k134dk")

  collection.indexes = [
    "CREATE INDEX `idx_sSgiBj6` ON `lessons` (`set_id`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2zuwxnns",
    "name": "set_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "awusgobwenumftw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
