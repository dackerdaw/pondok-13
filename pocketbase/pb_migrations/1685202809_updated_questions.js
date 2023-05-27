migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // remove
  collection.schema.removeField("kgmvkmee")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "55ja3nxr",
    "name": "question_markdown",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hldxrdoedu9tn38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kgmvkmee",
    "name": "question",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("55ja3nxr")

  // remove
  collection.schema.removeField("yasfk84u")

  return dao.saveCollection(collection)
})
