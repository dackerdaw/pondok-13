migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jobsga3lifx7azv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zyhxyc2x",
    "name": "child_groups",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "awusgobwenumftw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jobsga3lifx7azv")

  // remove
  collection.schema.removeField("zyhxyc2x")

  return dao.saveCollection(collection)
})
