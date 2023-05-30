migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // remove
  collection.schema.removeField("yasfk84u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8xa6agg",
    "name": "question",
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
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yasfk84u",
    "name": "question_markdown_props",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("j8xa6agg")

  return dao.saveCollection(collection)
})
