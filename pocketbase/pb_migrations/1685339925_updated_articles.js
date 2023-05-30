migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // remove
  collection.schema.removeField("8wrdm9zt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dgs5obhf",
    "name": "content",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8wrdm9zt",
    "name": "article_markdown",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("dgs5obhf")

  return dao.saveCollection(collection)
})
