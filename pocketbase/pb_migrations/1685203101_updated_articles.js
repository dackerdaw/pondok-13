migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // remove
  collection.schema.removeField("qqksq3q6")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a1nbmzhdakm2rb4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqksq3q6",
    "name": "article_url",
    "type": "url",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("8wrdm9zt")

  return dao.saveCollection(collection)
})
