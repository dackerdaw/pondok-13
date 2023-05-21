migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sbcw60dhlfyfo7a")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_n9pWY1S` ON `courses` (`slug`)",
    "CREATE INDEX `idx_835hua2` ON `courses` (`subject_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m94fim7r",
    "name": "subject_id",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "kmwuoxzwryok5w2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sbcw60dhlfyfo7a")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_n9pWY1S` ON `courses` (`slug`)"
  ]

  // remove
  collection.schema.removeField("m94fim7r")

  return dao.saveCollection(collection)
})
