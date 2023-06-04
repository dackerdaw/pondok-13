migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a0wkgail",
    "name": "abstract",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a0wkgail",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
