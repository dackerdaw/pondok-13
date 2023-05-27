migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c94sizos",
    "name": "duration",
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
  const collection = dao.findCollectionByNameOrId("w5f88si0vl41c15")

  // remove
  collection.schema.removeField("c94sizos")

  return dao.saveCollection(collection)
})
