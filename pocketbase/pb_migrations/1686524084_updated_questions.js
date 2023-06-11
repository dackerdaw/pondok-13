migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lredmrtr",
    "name": "practice_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "prg4ez6nencmj6d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // remove
  collection.schema.removeField("lredmrtr")

  return dao.saveCollection(collection)
})
