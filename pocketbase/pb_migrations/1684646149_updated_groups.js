migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "whijzogf",
    "name": "is_quiz",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("awusgobwenumftw")

  // remove
  collection.schema.removeField("whijzogf")

  return dao.saveCollection(collection)
})
