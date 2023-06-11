migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n2yiqov8",
    "name": "questions",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hldxrdoedu9tn38",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // remove
  collection.schema.removeField("n2yiqov8")

  return dao.saveCollection(collection)
})
