migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wvreljcp",
    "name": "extras",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wvreljcp",
    "name": "extra",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
