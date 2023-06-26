migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("prg4ez6nencmj6d")

  // remove
  collection.schema.removeField("n2yiqov8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y4r9y8um",
    "name": "time_estimate_lower_bound",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqdwoldg",
    "name": "time_estimate_upper_bound",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("y4r9y8um")

  // remove
  collection.schema.removeField("kqdwoldg")

  return dao.saveCollection(collection)
})
