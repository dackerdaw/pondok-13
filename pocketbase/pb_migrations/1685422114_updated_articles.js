migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0saabzv",
    "name": "editor",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // remove
  collection.schema.removeField("w0saabzv")

  return dao.saveCollection(collection)
})
